/**
 * DistrictCheck tool-page generator
 *
 * Source of truth:
 * - This file owns the generated tool corpus in /tools/*.html
 * - This file also regenerates /tools/index.html and /sitemap.xml
 *
 * Edit workflow:
 * - If you want to change shared tool-page layout, SEO fields, FAQ/schema,
 *   related links, alias handling, or sitemap inclusion for generated pages,
 *   make the change here first.
 * - After editing this file, run: `node generate-tool-pages.js`
 *
 * Important:
 * - Direct edits to generated files in /tools may be overwritten the next time
 *   this generator runs.
 * - Hand-authored pages such as /blog, /resources, /vendors, and category
 *   landing pages under nested tool directories are maintained separately, but
 *   some of them are intentionally included in the sitemap via `staticPages`.
 */
const fs = require('fs');
const path = require('path');

const DEFAULT_LASTMOD = '2026-04-06';
const BLOG_INDEX_LASTMOD = '2026-04-05';
const OG_IMAGE = 'https://districtcheck.io/og-default.png';
const staticPages = [
  { loc: 'https://districtcheck.io/audit/', lastmod: '2026-04-06' },
  { loc: 'https://districtcheck.io/resources/ada-title-ii-faq', lastmod: '2026-04-05' },
  { loc: 'https://districtcheck.io/resources/vendor-vpat-request-template', lastmod: '2026-04-05' },
  { loc: 'https://districtcheck.io/resources/wcag-checklist-edtech', lastmod: '2026-04-05' },
  { loc: 'https://districtcheck.io/tools/section-508/', lastmod: '2026-04-13' },
  { loc: 'https://districtcheck.io/tools/lms/', lastmod: '2026-04-05' },
  { loc: 'https://districtcheck.io/tools/lms/canvas-vs-schoology', lastmod: '2026-04-05' },
  { loc: 'https://districtcheck.io/tools/lms/google-classroom-vs-canvas', lastmod: '2026-04-13' },
  { loc: 'https://districtcheck.io/tools/assessment/nearpod-vs-pear-deck', lastmod: '2026-04-13' },
  { loc: 'https://districtcheck.io/tools/assessment/', lastmod: '2026-04-05' },
  { loc: 'https://districtcheck.io/tools/communication/', lastmod: '2026-04-05' },
  { loc: 'https://districtcheck.io/tools/content/', lastmod: '2026-04-05' },
  { loc: 'https://districtcheck.io/vendors/', lastmod: '2026-04-05' }
];

const blogPosts = [
  {
    title: 'After the ADA Title II Deadline: What Enforcement Actually Looks Like',
    slug: 'ada-title-ii-enforcement-update.html',
    lastmod: '2026-04-05',
    description: 'A practical look at post-deadline complaint risk, DOJ enforcement, and what districts should do if they are still behind.',
    tools: ['ClassDojo', 'Kahoot', 'IXL', 'Canvas', 'Google Classroom', 'Edulastic', 'Formative', 'Nearpod', 'ParentSquare', 'Schoology']
  },
  {
    title: 'ADA Title II 30-Day Compliance Roadmap for K-12 Districts',
    slug: 'ada-title-ii-30-day-compliance-roadmap.html',
    lastmod: '2026-04-05',
    description: 'A step-by-step 30-day roadmap for K-12 districts to build ADA Title II edtech compliance documentation.',
    tools: ['ClassDojo', 'Edulastic', 'Formative', 'Kahoot', 'Canvas', 'Google Classroom', 'Schoology', 'ParentSquare', 'Nearpod', 'IXL']
  },
  {
    title: 'ADA Title II Deadline for K-12 Districts',
    slug: 'ada-title-ii-deadline-k12-districts.html',
    lastmod: '2026-04-04',
    description: 'What districts must do before the April 24, 2026 ADA Title II deadline, including inventory, prioritization, and documentation.',
    tools: ['ClassDojo', 'Kahoot', 'Canvas', 'IXL', 'Seesaw', 'Nearpod', 'Google Classroom']
  },
  {
    title: 'What Is a VPAT? A Guide for School Districts',
    slug: 'what-is-a-vpat-school-districts.html',
    lastmod: '2026-04-04',
    description: 'A practical explanation of VPATs, how to read them, and what to do when vendors do not provide one.',
    tools: ['Google Classroom', 'Canvas', 'Khan Academy', 'Microsoft Teams', 'Seesaw', 'Pear Deck', 'Newsela', 'ClassDojo', 'Formative', 'Edulastic', 'Kahoot', 'IXL']
  },
  {
    title: 'The 5 Riskiest Edtech Tools for ADA Compliance',
    slug: 'riskiest-edtech-tools-ada-compliance.html',
    lastmod: '2026-04-04',
    description: 'A risk-focused breakdown of the tools districts should prioritize first, with concrete next steps.',
    tools: ['ClassDojo', 'Formative', 'Kahoot', 'IXL', 'Edulastic', 'Schoology', 'Google Classroom', 'Canvas', 'Khan Academy']
  },
  {
    title: 'What Happens If Your District Missed the ADA Title II Deadline',
    slug: 'missed-ada-title-ii-deadline.html',
    lastmod: '2026-04-25',
    description: 'What districts should do immediately after missing the ADA Title II deadline, including documentation, prioritization, and complaint-risk reduction.',
    tools: ['ClassDojo', 'Kahoot', 'IXL', 'Canvas', 'Google Classroom', 'Edulastic', 'Formative', 'Nearpod']
  }
];

const tools = [
  { name: 'ClassDojo', tier: 'low', vpat: 'Exists (2025)', wcag: 'Specific claim', pii: 'Yes', action: 'Download and file the September 2025 ACR (WCAG 2.2 A/AA Edition, VPAT 2.5) from ClassDojo\'s accessibility page. ClassDojo has independent Level Access testing confirming WCAG 2.1 and 2.2 AA conformance for web and iOS. Add to annual review cycle.' },
  { name: 'Formative', tier: 'critical', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Send vendor outreach immediately. If no VPAT is received before April 24, document an accessible alternative assessment pathway for students who need it.' },
  { name: 'GoFormative', tier: 'critical', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', canonical: 'Formative', action: 'Send vendor outreach immediately. If no VPAT is received before April 24, document an accessible alternative assessment pathway for students who need it.' },
  { name: 'Edulastic', tier: 'critical', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Send outreach today. Loop in your Special Education Director - any student with an IEP or 504 taking Edulastic assessments needs a documented accessibility accommodation pathway now.' },
  { name: 'Nearpod', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', action: 'Obtain and file the 2023 ACR (WCAG 2.0 AA). Note that the VPAT references WCAG 2.0, not 2.1 — request an updated conformance report covering WCAG 2.1 AA for ADA Title II purposes. Flag interactive elements (drag-and-drop, timed activities) for accommodation documentation.' },
  { name: 'IXL', tier: 'medium', vpat: 'Exists (confidential)', wcag: 'Specific claim', pii: 'Yes', action: 'Request IXL\'s ACR through your account contact (the document is distributed as confidential, not publicly downloadable). Note that the existing ACR is self-authored by IXL employees rather than independently audited. Flag the math input interface and timed activities for accommodation documentation.' },
  { name: 'IXL Learning', tier: 'medium', vpat: 'Exists (confidential)', wcag: 'Specific claim', pii: 'Yes', canonical: 'IXL', action: 'Request IXL\'s ACR through your account contact (the document is distributed as confidential, not publicly downloadable). Note that the existing ACR is self-authored by IXL employees rather than independently audited. Flag the math input interface and timed activities for accommodation documentation.' },
  { name: 'Remind', tier: 'high', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Request VPAT. If Remind is used for emergency communications, also document an accessible alternative channel (email + robocall) as an interim measure.' },
  { name: 'Kahoot', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'No', action: 'Download and file the December 2024 ACR (VPAT 2.5, WCAG 2.2 AA) from Kahoot\'s Trust Center. Add to annual review cycle. For graded activities, note that interactive/timed formats may still create barriers even when technically conformant.' },
  { name: 'Quizlet', tier: 'high', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', action: 'Request VPAT. Note that Quizlet Live (timed, competitive format) has structural accessibility barriers - flag for any teacher using it for assessed activities.' },
  { name: 'CommonLit', tier: 'high', vpat: 'Not found', wcag: 'Aspirational', pii: 'Yes', action: 'Send vendor outreach requesting VPAT. CommonLit states a goal to comply with WCAG 2.1 AA on their accessibility page but has not published conformance documentation. An aspirational claim does not reduce the compliance risk.' },
  { name: 'ReadWorks', tier: 'high', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Send outreach - but expect a slow response given nonprofit capacity. Document the attempt regardless. Consider whether accessible alternatives exist for literary instruction.' },
  { name: 'ParentSquare', tier: 'high', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Request VPAT immediately. As a primary parent communication channel, this falls squarely in ADA Title II scope. Document an accessible alternative communication process in the interim.' },
  { name: 'Screencastify', tier: 'high', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Request VPAT. Also verify whether student video recordings are stored on Screencastify servers - if so, confirm data handling agreements.' },
  { name: 'Schoology', tier: 'high', vpat: 'Unclear post-acquisition', wcag: 'Vague claim', pii: 'Yes', action: 'Call PowerSchool directly (not web form) and ask to be connected to their accessibility team. Request a current VPAT specifically for the Schoology parent portal.' },
  { name: 'Padlet', tier: 'medium', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Download and file the current VPAT from legal.padlet.com/accessibility. Padlet targets WCAG 2.2 AA and has made documented keyboard and screen reader improvements. The Board product is broadly compliant but not fully conformant — document accessibility alternatives for student-created content workflows.' },
  { name: 'Prodigy', tier: 'high', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Request VPAT. Game-based math format has inherent accessibility concerns similar to Kahoot - flag timed and interactive elements.' },
  { name: 'Boom Learning', tier: 'medium', vpat: 'Exists (date unconfirmed)', wcag: 'No claim', pii: 'Yes', action: 'Download the four VPATs (student, teacher, school-account, and guest views) from the Boom Learning help center. Verify VPAT dates and WCAG claim level in each document, then update this record. Document accessible alternatives for interactive card types that rely on drag-and-drop.' },
  { name: 'Wakelet', tier: 'high', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', action: 'Request VPAT. Content curation interface has reported keyboard navigation issues.' },
  { name: 'Seesaw', tier: 'medium', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Download and file the January 2024 ACR (revised Nov 2025) from Seesaw\'s accessibility page. Seesaw is partially conformant with WCAG 2.2 AA. Portfolio creation and student-generated content tools have noted limitations — advise teachers that accessible alternatives should be documented for students with IEPs or 504s.' },
  { name: 'BrainPOP', tier: 'medium', vpat: 'Exists (2022)', wcag: 'Specific claim', pii: 'Yes', action: 'Request an updated VPAT (2024 or later). Also ask specifically about legacy video content captioning accuracy.' },
  { name: 'Pear Deck', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', action: 'File the existing VPAT. Note that freehand drawing and annotation tools are partially conformant - ensure text-based alternatives are available.' },
  { name: 'Newsela', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', action: 'File the existing VPAT. Low risk - add to annual review cycle.' },
  { name: 'Flip', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', action: 'Download and file the VPAT through Microsoft\'s accessibility documentation. Advise teachers that AI-generated captions on student-uploaded videos should be reviewed before class viewing.' },
  { name: 'Flipgrid', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', canonical: 'Flip', action: 'Download and file the VPAT through Microsoft\'s accessibility documentation. Advise teachers that AI-generated captions on student-uploaded videos should be reviewed before class viewing.' },
  { name: 'Discovery Education', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', action: 'File existing VPAT. Note partial conformance for interactive simulations and virtual labs. Review at next contract renewal.' },
  { name: 'Canva for Education', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', action: 'File existing VPAT. Canva has improved accessibility significantly but some advanced design features remain partially conformant.' },
  { name: 'Book Creator', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Download and file the ACR from Book Creator\'s help center (WCAG 2.2, Section 508, EN 301 549 compliant). Add to annual review cycle. Verify creation-interface workflows (student authoring) are specifically covered in the filed report.' },
  { name: 'Duolingo', tier: 'medium', vpat: 'Not found', wcag: 'Specific claim', pii: 'Yes', action: 'Request VPAT. Duolingo makes WCAG claims but no formal VPAT is published. Game-based timed activities warrant specific documentation.' },
  { name: 'Google Classroom', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Retain current VPAT on file. Add to annual accessibility review cycle. Check for updates when renewing Google Workspace contract. No immediate action needed.' },
  { name: 'Google Workspace', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Retain current VPAT on file. Google Workspace for Education has one of the most comprehensive accessibility programs in edtech. No immediate action needed.' },
  { name: 'Canvas', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Retain current VPAT on file. Note: LTI-embedded tools within Canvas are NOT covered by Canvas\'s VPAT - they require separate accessibility verification.' },
  { name: 'Khan Academy', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Download and file from Khan Academy\'s accessibility page. Some interactive exercise types (graphing tools) have noted limitations - proactively disclosed. No immediate action needed.' },
  { name: 'Microsoft Teams', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Retain current VPAT on file. Microsoft has one of the strongest accessibility programs in enterprise software. No immediate action needed.' },
  { name: 'Zoom', tier: 'low', vpat: 'Exists (2025)', wcag: 'Specific claim', pii: 'Yes', action: 'File the current Zoom Workplace or web-app VPAT that matches your deployment model. Districts using Zoom for required instruction should still note captioning, webinar, and breakout-room workflows in local guidance.' },
  { name: 'Clever', tier: 'medium', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', action: 'Request a current VPAT from Clever and ask specifically about portal navigation, MFA flows, and rostering interfaces used by students or families. Document the request date in your district file.' },
  { name: 'PowerSchool', tier: 'medium', vpat: 'Unclear public status', wcag: 'Specific claim', pii: 'Yes', action: 'Request VPATs through your PowerSchool account team — the documentation exists but is only distributed via a secure portal, not publicly downloadable. PowerSchool contractually commits to WCAG 2.1 Level AA. Request confirmation that the VPAT covers Schoology, the parent portal, and mobile. Document alternate access paths for any workflows with reported gaps.' },
  { name: 'Microsoft 365', tier: 'low', vpat: 'Exists (2025)', wcag: 'Specific claim', pii: 'Yes', action: 'Retain the current Microsoft 365 accessibility conformance reports in your compliance file and refresh them during annual review or major contract renewal. Verify specific apps in scope for your district deployment.' },
  { name: 'Canva Edu', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', canonical: 'Canva for Education', action: 'Use the canonical Canva for Education page for the current risk rating, VPAT status, and district next steps.' },
  { name: 'Typing.com', tier: 'medium', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', action: 'Request a current VPAT and ask specifically about keyboard-only exercises, timed drills, and how accuracy feedback is conveyed to assistive technology users.' },
  { name: 'Duolingo for Schools', tier: 'medium', vpat: 'Not found', wcag: 'Specific claim', pii: 'Yes', canonical: 'Duolingo', action: 'Use the canonical Duolingo page for the current risk rating, documentation status, and district action steps.' },
  { name: 'Epic', tier: 'medium', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', action: 'Request a VPAT from Epic and ask whether the current reading experience, read-aloud controls, and classroom assignment workflows have been audited against WCAG 2.1 AA.' },
  { name: 'Edpuzzle', tier: 'low', vpat: 'Exists (2025)', wcag: 'Specific claim', pii: 'Yes', action: 'Download and file the April 2025 VPAT 2.5 from Edpuzzle\'s help center. Covers WCAG 2.2 and Section 508. Add to annual review cycle. Verify caption workflows and LMS-embedded playback are included in the scope of the filed report.' },
  { name: 'Kami', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Download and file the October 2024 VPAT 2.5 directly from kamiapp.com. Note any partial conformance items related to annotation and draw tools and document accessible alternatives where needed. Add to annual review cycle.' },
  { name: 'Google Forms', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Retain the current Google Workspace accessibility documentation on file and note any district-specific guidance for image-based questions, file uploads, or add-ons that are not covered by Google Forms itself.' },
  { name: 'Flipgrid Studio', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', canonical: 'Flip', action: 'Use the canonical Flip page for the current risk rating, VPAT status, and district next steps.' },
  { name: 'Loom', tier: 'medium', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', action: 'Request a VPAT from Loom and ask about recorder controls, caption workflows, transcript accuracy, and whether students can access shared videos and comments with keyboard and screen reader support.' },
  { name: 'Notion', tier: 'medium', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Request a current VPAT and clarify which workspace features are in scope, especially databases, drag-and-drop blocks, comments, and shared classroom workspaces used with students.' },
  { name: 'Freckle', tier: 'medium', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Request a VPAT from Renaissance for Freckle and ask whether student practice activities, teacher dashboards, and adaptive pathways have current WCAG testing documentation.' },
  { name: 'DreamBox', tier: 'medium', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', action: 'Request a current VPAT and ask specifically about keyboard navigation, math manipulatives, and visual lesson interactions that may create barriers for assistive technology users.' },
  { name: 'i-Ready', tier: 'medium', vpat: 'Not found', wcag: 'Specific claim', pii: 'Yes', action: 'Escalate a VPAT request through your Curriculum Associates contact. Note that i-Ready claims WCAG 2.0 AA conformance (with documented exceptions) as of the 2019–20 school year, but has not published a VPAT and has not updated to WCAG 2.1. Request a current conformance report covering diagnostic, lesson-player, and student practice workflows.' },
  { name: 'Lexia', tier: 'medium', vpat: 'Unclear public status', wcag: 'Vague claim', pii: 'Yes', action: 'Request current accessibility documentation for the exact Lexia product in use and ask whether reading, audio, and intervention workflows are covered by a recent VPAT or ACR.' },
  { name: 'Amplify', tier: 'medium', vpat: 'Unclear public status', wcag: 'Vague claim', pii: 'Yes', action: 'Request a current VPAT or accessibility conformance report for the exact Amplify product line your district uses and record whether curriculum, assessment, and student-reader interfaces are all covered.' }
];

const tierMap = {
  critical: { label: 'Critical', eyebrow: 'Critical Risk', accent: '#ef4444', glow: 'rgba(239,68,68,0.20)', summary: 'This tool has the highest level of ADA compliance risk in the database because public documentation is missing and the tool is student-facing.', nextStep: 'Immediate outreach and an interim accessible alternative should be documented before the ADA Title II deadline.' },
  high: { label: 'High', eyebrow: 'High Risk', accent: '#f97316', glow: 'rgba(249,115,22,0.20)', summary: 'This tool shows elevated ADA compliance risk because the VPAT is missing, unclear, or paired with weak accessibility claims.', nextStep: 'Districts should request updated documentation now and flag likely problem areas for review.' },
  medium: { label: 'Medium', eyebrow: 'Medium Risk', accent: '#f59e0b', glow: 'rgba(245,158,11,0.20)', summary: 'This tool has some accessibility documentation, but there are still gaps, dated materials, or partially conformant features to track.', nextStep: 'Districts should file current documentation and note any areas where accommodations may still be needed.' },
  low: { label: 'Low', eyebrow: 'Low Risk', accent: '#22c55e', glow: 'rgba(34,197,94,0.20)', summary: 'This tool is one of the stronger ADA compliance entries in the database, with current documentation and a specific WCAG claim.', nextStep: 'The main task is retention, annual review, and checking for updates at renewal time.' }
};

const seoOverrides = {
  ClassDojo: {
    title: 'ClassDojo ADA Compliance (Low Risk) | DistrictCheck',
    description: 'ClassDojo published a full WCAG 2.2 AA conformance report (VPAT 2.5, independently tested by Level Access) in September 2025. See what to file and add to your annual review cycle.'
  },
  Edulastic: {
    title: 'Edulastic ADA Compliance (Critical Risk) | DistrictCheck',
    description: 'Edulastic has no VPAT and no WCAG claim - critical risk for any district using it for student assessments. See gaps and recommended next steps.'
  },
  Formative: {
    title: 'Formative ADA Compliance (Critical Risk) | DistrictCheck',
    description: 'Formative has no VPAT and no WCAG conformance claim - critical risk for K-12 districts. Here is what the gap means and what to request from your vendor.'
  },
  Kahoot: {
    title: 'Kahoot ADA Compliance (Low Risk) | DistrictCheck',
    description: 'Kahoot published a full WCAG 2.2 AA ACR (VPAT 2.5) in December 2024. Low ADA Title II risk. See what to download, file, and note for graded interactive activities.'
  },
  Prodigy: {
    title: 'Prodigy Math ADA Compliance (High Risk) | DistrictCheck',
    description: 'Prodigy Math has no VPAT and no WCAG claim - high ADA risk. See the accessibility gaps in its game interface and what to request from the vendor.'
  },
  Nearpod: {
    title: 'Nearpod ADA Compliance (Medium Risk) | DistrictCheck',
    description: 'Nearpod has a 2023 ACR (WCAG 2.0 AA) — medium ADA Title II risk. The VPAT is dated and targets an older WCAG standard. See what to request and document for real-time activities.'
  },
  Padlet: {
    title: 'Padlet ADA Compliance (Medium Risk) | DistrictCheck',
    description: 'Padlet has a current 2024 VPAT (WCAG 2.2 AA, partially conformant) — medium ADA Title II risk. See what to file and document for student-created content workflows.'
  },
  Canvas: {
    title: 'Canvas LMS ADA Compliance (Low Risk) | DistrictCheck',
    description: 'Canvas has a current 2024 VPAT and a specific WCAG 2.1 AA claim — low ADA Title II risk. See what the VPAT covers, partial-support notes, and the one LTI exception districts must know.'
  },
  'Google Classroom': {
    title: 'Google Classroom ADA Compliance (Low Risk) | DistrictCheck',
    description: 'Google Classroom has a current 2024 VPAT and specific WCAG claim — low ADA Title II risk. See what is covered, what is partially supported, and what districts should file.'
  },
  'Canva for Education': {
    title: 'Canva Education ADA Compliance | DistrictCheck',
    description: 'Canva for Education ADA compliance review for K-12 districts: medium risk, current VPAT available, and key accessibility follow-ups to document.'
  },
  'Discovery Education': {
    title: 'Discovery Education ADA Compliance | DistrictCheck',
    description: 'Discovery Education ADA compliance review for K-12 districts: medium risk, current VPAT available, and the partial-support areas districts should note.'
  },
  'Tool Database': {
    title: 'Edtech ADA Compliance Database | DistrictCheck',
    description: 'Browse 47 edtech tools with ADA risk ratings, VPAT status, and WCAG notes. See where your district stands before the April deadline.'
  }
};

const categoryGuides = {
  Canvas: [{ title: 'LMS accessibility guide', href: './lms/index.html' }],
  Schoology: [{ title: 'LMS accessibility guide', href: './lms/index.html' }],
  'Google Classroom': [{ title: 'LMS accessibility guide', href: './lms/index.html' }],
  'Microsoft Teams': [{ title: 'LMS accessibility guide', href: './lms/index.html' }],
  'Microsoft 365': [{ title: 'LMS accessibility guide', href: './lms/index.html' }],
  Clever: [{ title: 'LMS accessibility guide', href: './lms/index.html' }],
  PowerSchool: [{ title: 'LMS accessibility guide', href: './lms/index.html' }],
  Edulastic: [{ title: 'Assessment tools guide', href: './assessment/index.html' }],
  Formative: [{ title: 'Assessment tools guide', href: './assessment/index.html' }],
  Kahoot: [{ title: 'Assessment tools guide', href: './assessment/index.html' }],
  Quizlet: [{ title: 'Assessment tools guide', href: './assessment/index.html' }],
  'Google Forms': [{ title: 'Assessment tools guide', href: './assessment/index.html' }],
  Freckle: [{ title: 'Assessment tools guide', href: './assessment/index.html' }],
  DreamBox: [{ title: 'Assessment tools guide', href: './assessment/index.html' }],
  'i-Ready': [{ title: 'Assessment tools guide', href: './assessment/index.html' }],
  ClassDojo: [{ title: 'Communication tools guide', href: './communication/index.html' }],
  Remind: [{ title: 'Communication tools guide', href: './communication/index.html' }],
  ParentSquare: [{ title: 'Communication tools guide', href: './communication/index.html' }],
  Seesaw: [{ title: 'Communication tools guide', href: './communication/index.html' }],
  Zoom: [{ title: 'Communication tools guide', href: './communication/index.html' }],
  Newsela: [{ title: 'Content tools guide', href: './content/index.html' }],
  CommonLit: [{ title: 'Content tools guide', href: './content/index.html' }],
  ReadWorks: [{ title: 'Content tools guide', href: './content/index.html' }],
  'Khan Academy': [{ title: 'Content tools guide', href: './content/index.html' }],
  'Discovery Education': [{ title: 'Content tools guide', href: './content/index.html' }],
  'Canva for Education': [{ title: 'Content tools guide', href: './content/index.html' }],
  'Typing.com': [{ title: 'Content tools guide', href: './content/index.html' }],
  Epic: [{ title: 'Content tools guide', href: './content/index.html' }],
  Edpuzzle: [{ title: 'Content tools guide', href: './content/index.html' }],
  Kami: [{ title: 'Content tools guide', href: './content/index.html' }],
  Loom: [{ title: 'Content tools guide', href: './content/index.html' }],
  Notion: [{ title: 'Content tools guide', href: './content/index.html' }],
  Lexia: [{ title: 'Content tools guide', href: './content/index.html' }],
  Amplify: [{ title: 'Content tools guide', href: './content/index.html' }],
  Padlet: [{ title: 'Content tools guide', href: './content/index.html' }],
  Prodigy: [{ title: 'Content tools guide', href: './content/index.html' }],
  'Boom Learning': [{ title: 'Content tools guide', href: './content/index.html' }],
  Wakelet: [{ title: 'Content tools guide', href: './content/index.html' }],
  'Book Creator': [{ title: 'Content tools guide', href: './content/index.html' }],
  Duolingo: [{ title: 'Content tools guide', href: './content/index.html' }]
};

const analysisContent = {
  ClassDojo: {
    sections: [
      '<p><strong>ClassDojo</strong> is one of the most widely deployed elementary classroom tools in the country. Districts use it for teacher-family communication, student behavior points, classroom updates, and portfolio sharing. That K-5 context matters because the tool is often woven into required classroom routines rather than offered as an optional supplement, which raises the stakes when accessibility documentation is missing.</p>',
      '<p>The biggest concern is not just that ClassDojo lacks a published VPAT. It is that the product combines several high-friction interface patterns without any public conformance record: animated avatars, visual point systems, feed-based notifications, and parent-facing messaging flows. For this type of tool, districts should specifically think about WCAG 2.1 AA criteria around non-text content, information and relationships, status messages, and meaningful navigation. If points, icons, or class activity updates are not announced properly to assistive technology, a student or caregiver can miss information that other users receive automatically.</p>',
      '<p>From a compliance standpoint, a missing VPAT means your district has no vendor-supplied evidence to file when asked how ClassDojo was reviewed. That documentation gap is the liability. The immediate next step is written outreach requesting a current VPAT and a WCAG 2.1 AA conformance statement, with the send date recorded in the district file. At the same time, district teams should identify whether students using screen readers, switch devices, or other assistive technology rely on ClassDojo for required participation. If the vendor cannot provide documentation quickly, the district should be ready to document an alternate communication or participation path for those users.</p>'
    ],
    faq: [
      ['Is ClassDojo ADA compliant?', 'No current VPAT or WCAG conformance claim has been published for ClassDojo, so DistrictCheck rates it as critical risk rather than verified compliant.'],
      ['Does ClassDojo have a VPAT?', 'As of the current review, ClassDojo has not published a VPAT or accessibility conformance report that districts can file as evidence.'],
      ['What should a district do about ClassDojo?', 'Send a written VPAT request, document the outreach date, and identify accessible alternatives for students or caregivers who may encounter barriers.']
    ]
  },
  Edulastic: {
    sections: [
      '<p><strong>Edulastic</strong> is an assessment platform, which makes its accessibility profile more sensitive than a casual classroom app. Districts use it for formative checks, benchmark testing, standards-aligned practice, and in some cases high-stakes student evaluation. When an assessment tool is not accessible, the impact is immediate: a student can be prevented from demonstrating what they know in an equitable way.</p>',
      '<p>The critical issue is that Edulastic has no public VPAT and no public WCAG claim. For assessment software, districts should be thinking specifically about keyboard support, focus order, drag-and-drop or graphing interactions, timed elements, and whether directions depend on visual cues alone. Question types that feel routine to a mouse user can become unusable with a screen reader, keyboard-only navigation, or alternative input device. Without vendor documentation, the district has no way to show that those question types were tested against WCAG 2.1 AA success criteria.</p>',
      '<p>Practically, that means Edulastic should be near the top of the outreach queue. The district should request a current VPAT and ask whether core item types have been tested with common assistive technologies such as JAWS, NVDA, and VoiceOver. At the same time, special education, assessment, and instructional teams should document what happens if a student cannot complete an Edulastic-based assessment accessibly. A written alternative administration plan is not just helpful risk management here; it is the minimum evidence that the district recognized the exposure and acted on it.</p>'
    ],
    faq: [
      ['Is Edulastic accessible for students with disabilities?', 'DistrictCheck rates Edulastic as critical risk because there is no current public VPAT or WCAG claim confirming accessible use across assessment workflows.'],
      ['Does Edulastic have a VPAT?', 'No public VPAT was found during the current review, so districts should request one directly through the vendor or account team.'],
      ['Why is Edulastic higher risk than many other tools?', 'Because it is an assessment platform, accessibility failures can directly affect student participation, grading, and documented educational outcomes.']
    ]
  },
  Formative: {
    sections: [
      '<p><strong>Formative</strong> sits in a high-exposure category because districts use it for live checks for understanding, quizzes, and graded classroom work. Assessment workflows always deserve extra scrutiny under ADA Title II because inaccessible question types, timing, or navigation are not merely frustrating - they can change whether a student is able to participate at all.</p>',
      '<p>DistrictCheck rates Formative as critical risk because there is no public VPAT and no public WCAG conformance claim to support a compliance file. In practice, districts should be thinking about keyboard operability, focus management, equation or math-entry interfaces, drag-and-drop activities, and any interactions that depend on speed or precise pointer input. If those patterns have not been tested and documented, the district cannot defend the assumption that the tool is accessible simply because teachers use it often.</p>',
      '<p>The immediate path is straightforward: request a current VPAT in writing, save the send date, and define what alternate assessment pathway exists if the vendor cannot produce documentation quickly. If Formative is used with students who rely on assistive technology, district teams should record that dependency now rather than waiting for a complaint or accommodation breakdown. For this category of tool, the difference between a manageable compliance issue and a serious exposure is often whether the district can show prompt outreach plus a documented backup plan.</p>'
    ],
    faq: [
      ['Is Formative ADA compliant?', 'DistrictCheck rates Formative as critical risk because there is no published VPAT or WCAG conformance statement verifying accessibility.'],
      ['Does Formative have a VPAT?', 'No public VPAT was located in the current review, so districts should request documentation directly from the vendor.'],
      ['What should districts do if they use Formative?', 'Request a VPAT immediately, document the outreach date, and define an accessible alternative assessment pathway if documentation is not produced in time.']
    ]
  },
  Kahoot: {
    sections: [
      '<p><strong>Kahoot</strong> is one of the most recognizable edtech brands in K-12, used for review games, quick checks, and whole-class participation. Its popularity makes it important from an SEO perspective, but the classroom mechanics are also why the tool remains risky from an accessibility standpoint. Timed play, color-coded answers, and fast-response competition create barriers that cannot be solved by marketing language alone.</p>',
      '<p>DistrictCheck rates Kahoot as high risk because the vendor has used aspirational accessibility language rather than publishing a VPAT or concrete WCAG conformance record. "Working toward WCAG 2.1 AA" is not a claim of compliance; it is an admission that conformance has not been established. Districts should pay particular attention to timing-adjustable requirements, use of color, keyboard operability, and whether image-based prompts or answer states are conveyed non-visually. These issues matter most when Kahoot is used for grades, required participation, or any activity where a student is penalized for slower or inaccessible interaction.</p>',
      '<p>For districts, the practical response is to stop treating Kahoot as harmless just because it is common. Add it to the accessibility risk register, request a VPAT, and tell teachers that graded Kahoot use needs an equivalent alternative until documentation improves. Team mode or alternate formats may reduce friction in some classrooms, but they do not replace a formal accessibility review. The key fileable evidence is a written vendor request plus a local policy for how students who cannot use the interface will participate equitably.</p>'
    ],
    faq: [
      ['Is Kahoot ADA compliant?', 'Kahoot is rated high risk because no VPAT was published and the vendor language is aspirational rather than a verified WCAG conformance claim.'],
      ['Does Kahoot have a VPAT?', 'No public VPAT was found in the current review, so districts should request one directly from the vendor.'],
      ['Can Kahoot be used for graded work?', 'If Kahoot is used for graded or required participation, districts should document an equivalent alternative until accessibility documentation is clearer.']
    ]
  },
  Prodigy: {
    sections: [
      '<p><strong>Prodigy</strong> is a gamified math platform used heavily in elementary and middle school classrooms. Its fantasy game environment is part of the product appeal, but that same design introduces accessibility questions that districts cannot ignore. Animated interfaces, map navigation, battle flows, and reward systems all create more surface area than a simple worksheet or quiz tool.</p>',
      '<p>DistrictCheck rates Prodigy as high risk because there is no public VPAT and no documented WCAG claim. For a game-based interface like this, districts should be thinking about keyboard navigation, contrast across UI elements, motion or animation effects, and whether the instructional content can be accessed without relying on visual exploration of the game world. When the learning experience is tightly coupled to the game shell, the district needs evidence that assistive technology users can still participate meaningfully.</p>',
      '<p>The district response should focus on leverage and contingency. If the district pays for Prodigy, the vendor should be asked directly for a VPAT and a timeline for WCAG documentation. Meanwhile, district teams should consider whether students with visual, motor, or processing-related disabilities need an alternate math platform or alternate access path until the compliance picture is clearer. Recording that review now is much stronger than trying to reconstruct a rationale after the fact.</p>'
    ],
    faq: [
      ['Is Prodigy Math ADA compliant?', 'DistrictCheck rates Prodigy as high risk because no public VPAT or WCAG conformance statement was found.'],
      ['Does Prodigy support assistive technology?', 'No vendor documentation currently confirms accessible support across the game interface, so districts should not assume full compatibility.'],
      ['What should districts request from Prodigy?', 'Ask for a current VPAT, any third-party accessibility audit evidence, and product-specific clarification on keyboard and screen reader support.']
    ]
  },
  Nearpod: {
    sections: [
      '<p><strong>Nearpod</strong> is an interactive lesson-delivery tool used for live classroom presentations, embedded activities, polls, collaboration boards, and multimedia experiences. That real-time use case is why districts care about it: if a student cannot participate accessibly during the lesson, they are excluded in the moment rather than merely delayed.</p>',
      '<p>The current risk comes from the lack of a public VPAT combined with only vague accessibility language. Districts should be especially alert to WCAG criteria tied to meaningful sequence, focus visibility, non-text content in teacher-created slides, and pointer gestures for draw or drag interactions. Nearpod\'s flexibility is powerful instructionally, but it also means a district is relying on both the platform and teacher-authored content to behave accessibly. Without vendor documentation, there is no clear record of what parts of that stack have actually been audited.</p>',
      '<p>For compliance teams, the right move is to request documentation from the vendor or parent company, identify which activity types are most commonly used in the district, and tell staff where text-based or alternate-response options should be used when possible. If the district depends on Nearpod for classroom participation, it should not wait for a complaint to start documenting accommodations. A district note that says "Nearpod in use, vendor documentation pending, alternate activity formats available" is materially better than silence.</p>'
    ],
    faq: [
      ['Is Nearpod ADA compliant?', 'DistrictCheck rates Nearpod as high risk because no public VPAT was found and the current accessibility claim is too vague to verify conformance.'],
      ['Does Nearpod have a VPAT?', 'No current public VPAT was found during review, so districts should request one directly from the vendor or account team.'],
      ['What Nearpod features are most likely to create accessibility issues?', 'Real-time interactive activities such as draw, drag, and collaborative response formats deserve the closest review for keyboard and assistive-technology compatibility.']
    ]
  },
  Padlet: {
    sections: [
      '<p><strong>Padlet</strong> is often adopted quickly because it feels lightweight and creative. Teachers use it for brainstorming, collaborative boards, portfolio work, and multimedia sharing across grade levels. That flexibility is exactly why districts need a clearer compliance posture: the product is frequently used in graded or required assignments even when it entered the district informally.</p>',
      '<p>DistrictCheck rates Padlet as high risk because there is no public VPAT and the vendor language around accessibility remains vague. From an accessibility perspective, a free-form board layout raises immediate concerns about information relationships, reading order, keyboard alternatives for drag-and-drop interactions, and whether user-added media can be made understandable to assistive technology users. A canvas that looks intuitive visually can still be difficult to navigate if the structure is not exposed properly to screen readers.</p>',
      '<p>Districts should request a VPAT, ask specifically about board navigation with screen readers and keyboard-only use, and decide whether classes using Padlet for graded work need an alternate submission path while documentation remains unresolved. This is also a teacher-practice issue: if students are uploading images, audio, or video, classrooms need expectations around alt text and accessible descriptions. In other words, Padlet risk is partly vendor-side and partly implementation-side, which makes documented guidance even more important.</p>'
    ],
    faq: [
      ['Is Padlet ADA compliant?', 'DistrictCheck rates Padlet as high risk because no public VPAT was found and the existing accessibility language does not verify WCAG conformance.'],
      ['Does Padlet have an accessibility conformance report?', 'No current public VPAT or ACR was found during review, so districts should request documentation from the vendor directly.'],
      ['Why is Padlet challenging for accessibility?', 'The free-form board structure, multimedia uploads, and drag-style interactions can create navigation and comprehension barriers for assistive technology users.']
    ]
  },
  'Google Classroom': {
    sections: [
      '<p><strong>Google Classroom</strong> is one of the strongest documentation examples in the DistrictCheck database and therefore a useful contrast case. Districts use it as the core assignment, workflow, and communication layer inside Google Workspace for Education. Because it is so widely deployed, many teams assume a low-risk rating means "done." The better interpretation is "documented and defensible," not "never review again."</p>',
      '<p>DistrictCheck rates Google Classroom as low risk because Google publishes current accessibility documentation, including VPAT materials that reference WCAG 2.1 AA and disclose partial-support areas honestly. That matters because credible accessibility documentation is not just a checkbox - it shows where the product has been tested, where exceptions exist, and what assistive-technology guidance is available. Districts should still review partial-support notes against their own student use cases, especially if certain Classroom workflows are central to instruction or accommodations.</p>',
      '<p>The most important district action is retention and scope awareness. Download the current documentation, file it in the district compliance record, and note when it should be refreshed. Also remember that Classroom\'s favorable status does not automatically extend to every third-party tool linked inside it. If teachers embed or assign external apps through Classroom or Google Workspace, those tools need their own review. In other words, Google Classroom can serve as a model for what good vendor documentation looks like while also reminding districts not to let a strong platform mask weaker tools connected to it.</p>'
    ],
    faq: [
      ['Is Google Classroom ADA compliant?', 'Google Classroom is rated low risk because Google publishes current accessibility documentation and specific WCAG-related conformance materials, though districts should still review partial-support notes.'],
      ['Does Google Classroom have a VPAT?', 'Yes. Google publishes accessibility conformance materials for Workspace products, and districts should retain the current Google Classroom documentation in their compliance files.'],
      ['Does Google Classroom cover tools integrated inside it?', 'No. Third-party tools used through Classroom still need their own accessibility review and cannot rely on Google Classroom\'s documentation alone.']
    ]
  },
  Zoom: {
    sections: [
      '<p><strong>Zoom</strong> is no longer just a general meeting tool in K-12. Districts use Zoom for virtual instruction, parent conferences, professional learning, special education meetings, and one-to-one support sessions. That broad usage means accessibility has to be judged across live captions, keyboard navigation, webinar controls, recordings, and the web or desktop client a district actually deploys.</p>',
      '<p>DistrictCheck rates Zoom as low risk because Zoom publishes accessibility documentation and product-specific VPAT materials for major parts of the platform, including workplace clients and web experiences. That does not mean every classroom workflow is perfect by default. Districts still need to think about caption quality, whether recordings are shared with accurate transcripts, and whether hosts know how to enable accessibility features like manual captions, keyboard shortcuts, and screen-reader-friendly controls.</p>',
      '<p>The practical district action is to file the Zoom documentation that matches the version in use, then pair it with local meeting guidance. If your district relies on Zoom for required student or family interactions, you want two records on file: the vendor VPAT and the district procedure for captions, accessible recordings, and alternate participation paths when needed. That combination makes Zoom one of the more defensible communication tools in a compliance review.</p>'
    ],
    faq: [
      ['Is Zoom ADA compliant?', 'Zoom is rated low risk because the vendor publishes accessibility documentation and product-specific VPAT materials for major platform components.'],
      ['Does Zoom have a VPAT?', 'Yes. Zoom publishes VPAT materials for Zoom Workplace, web experiences, and other major products, and districts should file the one that matches their deployment.'],
      ['What should districts still review in Zoom?', 'Districts should still document captioning, transcript accuracy, recording workflows, and host guidance for accessible meeting practices.']
    ]
  },
  Clever: {
    sections: [
      '<p><strong>Clever</strong> is infrastructure more than classroom content, but that makes it strategically important. Districts use Clever for single sign-on, rostering, application launch, and in some cases multi-factor authentication or identity workflows. If a student, family member, or staff user cannot navigate the portal or authentication flow accessibly, the barrier affects access to many other tools downstream.</p>',
      '<p>DistrictCheck rates Clever as medium risk because it is widely deployed and clearly central to district access, but a current public VPAT is not easy to verify in the same way as the strongest low-risk vendors. For a platform like Clever, districts should focus on keyboard navigation in the portal, screen-reader labeling for app launch tiles, error handling during authentication, and whether rostering or account-management interfaces are accessible for staff who use assistive technology.</p>',
      '<p>The right district move is to request a current VPAT directly and document which Clever workflows are mission-critical locally. If Clever is the doorway into multiple student-facing tools, the district should record that dependency in its accessibility file and note how students or families can get support if the sign-in path becomes a barrier. Clever is not the flashiest tool in the stack, but it is one of the most consequential if access fails.</p>'
    ],
    faq: [
      ['Is Clever ADA compliant?', 'DistrictCheck rates Clever as medium risk because it is widely used in K-12 but a current public VPAT is not clearly surfaced in the same way as stronger low-risk vendors.'],
      ['Does Clever have a VPAT?', 'Districts should request a current VPAT or accessibility conformance report directly from Clever or their district account channel.'],
      ['Why does Clever matter so much for accessibility?', 'Because Clever often sits at the access layer for many other tools, an inaccessible sign-in or portal workflow can block students and staff from the rest of the stack.']
    ]
  },
  PowerSchool: {
    sections: [
      '<p><strong>PowerSchool</strong> is core district infrastructure, not a fringe classroom app. Districts rely on it for SIS workflows, parent portals, schedules, grades, attendance, and records that families and staff may need to access frequently. That makes any accessibility gap more serious because it affects official school operations and communication, not just optional enrichment.</p>',
      '<p>DistrictCheck rates PowerSchool as high risk because the public documentation picture is unclear and districts often need product-specific clarification about what accessibility materials apply to SIS, parent-facing tools, mobile experiences, or acquired products. For this category of system, the main WCAG questions are not abstract. Families need readable schedules and grades, students need usable portals, and staff may depend on keyboard or screen-reader access to administrative workflows.</p>',
      '<p>Districts using PowerSchool should treat documentation requests as a priority rather than a nice-to-have. Ask which VPAT or accessibility conformance report covers the exact modules in use, save the response, and document alternate support paths for any family or student who cannot use the portal accessibly. Because PowerSchool touches official records and communications, unresolved documentation gaps carry more institutional risk than a typical classroom supplement.</p>'
    ],
    faq: [
      ['Is PowerSchool ADA compliant?', 'DistrictCheck rates PowerSchool as high risk because the public accessibility documentation picture is unclear for many district-relevant workflows and products.'],
      ['Does PowerSchool have a VPAT?', 'Districts should request product-specific accessibility documentation directly from PowerSchool because public coverage is not clear enough to treat as settled evidence.'],
      ['Why is PowerSchool higher risk than some other tools?', 'Because it is district infrastructure tied to grades, records, parent access, and official workflows, so accessibility failures affect core school operations.']
    ]
  },
  'Microsoft 365': {
    sections: [
      '<p><strong>Microsoft 365</strong> is one of the broadest product suites in education, covering Word, PowerPoint, Excel, OneDrive, Teams-adjacent workflows, and cloud collaboration tools used by staff and students. That breadth means districts should think in terms of suite-level documentation plus app-specific implementation practices. A good Microsoft 365 compliance file is not one PDF and done; it is a current vendor record paired with local content-authoring expectations.</p>',
      '<p>DistrictCheck rates Microsoft 365 as low risk because Microsoft publishes accessibility conformance reports and maintains a mature public accessibility program. That gives districts a stronger starting point than they have with many K-12 vendors. The remaining work is operational: staff still need to use built-in accessibility checkers, share accessible files, caption videos, and avoid introducing inaccessible templates or add-ins that the Microsoft documentation does not cover.</p>',
      '<p>The practical next step is to keep the current Microsoft conformance reports on file and note which products are actually in scope for your district. If you rely heavily on Forms, Stream, PowerPoint, or OneDrive sharing workflows, document those local use cases as part of annual review. Microsoft 365 is one of the more defensible suites in the edtech environment, but districts still need to separate the vendor platform from the content their own staff publish inside it.</p>'
    ],
    faq: [
      ['Is Microsoft 365 ADA compliant?', 'DistrictCheck rates Microsoft 365 as low risk because Microsoft publishes accessibility conformance reports and maintains a strong accessibility program across major apps.'],
      ['Does Microsoft 365 have a VPAT?', 'Yes. Microsoft publishes accessibility conformance reports for Microsoft 365 products, and districts should retain the current reports relevant to the apps they deploy.'],
      ['What should districts still monitor in Microsoft 365?', 'Districts should still monitor how staff create documents, presentations, forms, and shared content, because local authoring practices can introduce barriers even on strong platforms.']
    ]
  },
  'Typing.com': {
    sections: [
      '<p><strong>Typing.com</strong> is used in many districts as a foundational skills tool for keyboarding, digital literacy, and introductory computing. Because it is often assigned to younger students or used in regular classroom rotations, accessibility issues can affect a large number of learners quietly rather than through one obvious high-stakes event.</p>',
      '<p>DistrictCheck rates Typing.com as medium risk because the platform has obvious accessibility implications, but a current public VPAT is not easy to verify. For a keyboarding tool, districts should pay special attention to timing, focus order, audio feedback, and whether performance signals are conveyed in ways that work with screen readers or for students with motor differences. A tool built around speed and accuracy can become exclusionary quickly if it assumes a narrow input pattern.</p>',
      '<p>The district response should be practical and student-centered. Request a current VPAT, ask how lessons and drills work for keyboard-only and assistive-technology users, and document what alternatives exist if a student cannot complete the standard exercise format. Typing.com may not sound legally dramatic, but because it is often used as required instruction, unresolved accessibility gaps still matter.</p>'
    ],
    faq: [
      ['Is Typing.com ADA compliant?', 'DistrictCheck rates Typing.com as medium risk because a current public VPAT is not clearly available and the product category raises important accessibility questions around timing and input.'],
      ['Does Typing.com have a VPAT?', 'Districts should request a current VPAT or accessibility conformance report directly from Typing.com.'],
      ['Why does keyboarding software create accessibility risk?', 'Because lessons often depend on speed, motor input, and real-time feedback that can create barriers for students who use assistive technology or alternate input methods.']
    ]
  },
  Epic: {
    sections: [
      '<p><strong>Epic</strong> is a digital reading platform used heavily in elementary classrooms and at-home reading programs. Teachers use it for independent reading, assigned books, and motivation around literacy goals. Because the platform is content-rich and student-facing, districts should evaluate both the reading interface and the classroom management layer that wraps around it.</p>',
      '<p>DistrictCheck rates Epic as medium risk because the vendor publicly emphasizes accessibility features, but a current public VPAT is not easy to verify. That creates a familiar district problem: positive accessibility language without the document that procurement or compliance teams need to file. For reading platforms, the critical questions include text customization, screen-reader compatibility, read-aloud controls, image descriptions, and whether classroom assignment workflows remain accessible for students and teachers.</p>',
      '<p>The district next step is to request a current VPAT and record whether the accessibility features highlighted publicly are backed by a formal WCAG review. If Epic is used with younger readers or students with accommodations, note what alternate access path exists if the assigned title or player experience is not usable. A medium-risk rating here reflects uncertainty in documentation rather than a proven failure, but districts still need the paper trail.</p>'
    ],
    faq: [
      ['Is Epic ADA compliant?', 'DistrictCheck rates Epic as medium risk because accessibility features are discussed publicly, but a current public VPAT is not clearly available for district review.'],
      ['Does Epic have a VPAT?', 'Districts should request a current VPAT or accessibility conformance report directly from Epic.'],
      ['What should districts review in Epic?', 'Districts should review read-aloud controls, screen-reader support, classroom assignment flows, and whether the current accessibility features are documented against WCAG 2.1 AA.']
    ]
  },
  Edpuzzle: {
    sections: [
      '<p><strong>Edpuzzle</strong> is a video-based lesson and assessment tool used across middle and high school classrooms and increasingly in blended elementary instruction. Teachers assign videos, embed questions, and track completion or understanding through the platform. That combination of media player, quiz interface, and analytics is exactly why districts need more than a generic help article before calling it compliant.</p>',
      '<p>DistrictCheck rates Edpuzzle as high risk because a current public VPAT is not clearly available and the platform is often used for required coursework. The risk is not just the video itself. Districts should think about caption quality, keyboard operability in the player, timing of embedded questions, focus handling when questions interrupt playback, and whether LMS-embedded versions behave the same way as the native experience. If those details are undocumented, the district has little defensible evidence.</p>',
      '<p>The immediate move is to request a VPAT and ask whether the player and question workflows have been tested with assistive technologies such as NVDA, JAWS, and VoiceOver. If Edpuzzle is used in graded activities, districts should also note what alternate path exists for a student who cannot complete the standard experience accessibly. High-risk does not mean never use; it means document fast and avoid assuming the interface has already been vetted for you.</p>'
    ],
    faq: [
      ['Is Edpuzzle ADA compliant?', 'DistrictCheck rates Edpuzzle as high risk because a current public VPAT is not clearly available and the platform is often used in required classroom workflows.'],
      ['Does Edpuzzle have a VPAT?', 'Districts should request a current VPAT directly from Edpuzzle, especially if the tool is used for graded assignments or LMS-integrated instruction.'],
      ['What parts of Edpuzzle matter most for accessibility?', 'Districts should review captions, keyboard use in the video player, embedded questions, and whether LMS-embedded workflows remain accessible.']
    ]
  },
  Kami: {
    sections: [
      '<p><strong>Kami</strong> is commonly used for document annotation, worksheet completion, PDF markup, and classroom collaboration. In many districts it becomes the layer students use to interact with otherwise static handouts. That means accessibility questions extend beyond the app shell itself to the experience of reading, navigating, and marking up classroom documents inside the tool.</p>',
      '<p>DistrictCheck rates Kami as medium risk because it is clearly important in classroom workflows, but a current public VPAT is not easy to verify. Annotation platforms deserve close review for keyboard support, focus order, labeling of markup tools, and whether drawing, highlighting, and comment functions have accessible alternatives. A district can easily assume a PDF workflow is covered when in reality the markup interaction introduces a new barrier.</p>',
      '<p>The right district action is to request a current VPAT, ask specifically about annotation and classroom assignment flows, and note whether accessible alternatives exist when teachers depend on freehand or visual markup. Medium risk here reflects a tool that may be workable in many cases but still lacks the documentation standard districts need for a clean compliance file.</p>'
    ],
    faq: [
      ['Is Kami ADA compliant?', 'DistrictCheck rates Kami as medium risk because a current public VPAT is not clearly available for district review.'],
      ['Does Kami have a VPAT?', 'Districts should request a current VPAT or accessibility conformance report directly from Kami.'],
      ['Why does annotation software need accessibility review?', 'Because markup, highlighting, drawing, and PDF interaction can create barriers even when the underlying document seems simple visually.']
    ]
  },
  'Google Forms': {
    sections: [
      '<p><strong>Google Forms</strong> is one of the most common lightweight tools in district workflows, used for surveys, quizzes, registration, family communication, and quick checks for understanding. It often appears harmless because it is simple and familiar, but its real compliance value is that it inherits the broader Google accessibility documentation ecosystem rather than relying on a vague standalone claim.</p>',
      '<p>DistrictCheck rates Google Forms as low risk because Google publishes accessibility conformance materials for Workspace products and maintains a mature public accessibility program. That said, districts should still distinguish between the platform and the form content they build. Image-based questions, poorly written labels, inaccessible linked files, and unsupported add-ons can all introduce barriers that are not solved by the vendor documentation alone.</p>',
      '<p>The practical district move is to retain the current Google documentation and add local author guidance: write clear prompts, avoid relying on images without text alternatives, and be cautious with third-party add-ons embedded in the form workflow. Google Forms is one of the easier tools to defend from a documentation standpoint, but it still benefits from a short district playbook for accessible form design.</p>'
    ],
    faq: [
      ['Is Google Forms ADA compliant?', 'DistrictCheck rates Google Forms as low risk because Google publishes accessibility documentation through its Workspace accessibility program.'],
      ['Does Google Forms have a VPAT?', 'Google publishes accessibility conformance materials for Workspace products, and districts should retain the current documentation relevant to Google Forms.'],
      ['What can still go wrong in Google Forms?', 'District-created content such as image-only questions, inaccessible attachments, and unsupported add-ons can still introduce barriers even on a low-risk platform.']
    ]
  },
  Loom: {
    sections: [
      '<p><strong>Loom</strong> is increasingly used in districts for staff communication, asynchronous feedback, tutorials, and student-created video explanation. That makes it relevant even when it is not formally purchased as a core instructional product. Video tools create a layered accessibility question: recording controls, playback controls, captions, transcripts, comments, and sharing all matter.</p>',
      '<p>DistrictCheck rates Loom as medium risk because the product is growing in school use but a current public VPAT is not easy to verify. Districts should especially review caption workflows, transcript quality, keyboard access in the player, and whether students can navigate shared videos and comments without relying on pointer-heavy interactions. A video platform can feel accessible if captions exist, while still leaving gaps in navigation or authoring.</p>',
      '<p>The next step is to request a current VPAT and document how Loom is actually used locally. If the tool is primarily staff-facing, the risk may be more manageable. If students must watch or submit Loom videos as part of required classwork, districts should note what accommodations or alternate formats are available until stronger documentation is on file.</p>'
    ],
    faq: [
      ['Is Loom ADA compliant?', 'DistrictCheck rates Loom as medium risk because a current public VPAT is not clearly available and districts often use it in communication and instruction workflows.'],
      ['Does Loom have a VPAT?', 'Districts should request a current VPAT or accessibility conformance report directly from Loom.'],
      ['What should districts review in Loom?', 'Districts should review captioning, transcript accuracy, keyboard access in the player, and whether shared videos and comments are accessible to assistive technology users.']
    ]
  },
  Notion: {
    sections: [
      '<p><strong>Notion</strong> is appearing more often in secondary classrooms, staff workflow, project-based learning, and internal district knowledge bases. It is flexible enough to be everything from a shared notebook to a lightweight student workspace, which is exactly what makes accessibility review harder. The product surface includes text blocks, databases, drag-and-drop layouts, comments, embeds, and linked pages.</p>',
      '<p>DistrictCheck rates Notion as medium risk because it is increasingly relevant in education settings while a current public VPAT is not easy to verify. For a block-based workspace, districts should be thinking about keyboard navigation across nested content, clarity of headings and page structure, drag-and-drop alternatives, and whether database views or toggles expose usable semantics to assistive technology. When a platform is this flexible, accessibility risk often depends on both product design and user-authored structure.</p>',
      '<p>The practical district move is to request a VPAT and decide whether Notion is being used for optional collaboration or required instructional workflows. If students must submit work or navigate course materials inside it, the district should document that use case specifically. Medium risk here reflects a product with real upside but insufficiently clear public documentation for K-12 teams that need audit-ready records.</p>'
    ],
    faq: [
      ['Is Notion ADA compliant?', 'DistrictCheck rates Notion as medium risk because a current public VPAT is not clearly available and the product has a complex, flexible interface.'],
      ['Does Notion have a VPAT?', 'Districts should request a current VPAT or accessibility conformance report directly from Notion if it is being used in school workflows.'],
      ['Why is Notion hard to evaluate for accessibility?', 'Because the workspace combines nested pages, databases, drag-and-drop blocks, and user-authored layouts that can create accessibility issues beyond simple text editing.']
    ]
  },
  Freckle: {
    sections: [
      '<p><strong>Freckle</strong> is a student practice platform used for math, ELA, and differentiated classroom activities. Because it is adaptive and frequently assigned during regular instruction, accessibility questions affect daily participation rather than a one-time event. Tools like Freckle are easy to overlook because they feel routine, but they still sit directly in the student experience.</p>',
      '<p>DistrictCheck rates Freckle as medium risk because a current public VPAT is not easy to verify even though the product is widely used. Districts should pay attention to keyboard support, adaptive question flows, visual feedback, and whether teacher dashboards and student practice experiences have both been assessed. A tool can work acceptably for many learners while still creating barriers for students who rely on screen readers or alternate input.</p>',
      '<p>The next step is to request product-specific documentation from Renaissance and record whether the district uses Freckle for required practice or intervention. If the vendor cannot provide a current VPAT promptly, note what alternate practice pathway exists for students who encounter barriers. Medium risk here means documentation needs to catch up to real classroom use.</p>'
    ],
    faq: [
      ['Is Freckle ADA compliant?', 'DistrictCheck rates Freckle as medium risk because a current public VPAT is not clearly available for district review.'],
      ['Does Freckle have a VPAT?', 'Districts should request a current VPAT or accessibility conformance report directly from Renaissance for Freckle.'],
      ['Why should districts review adaptive practice tools like Freckle?', 'Because they are used frequently with students and can create barriers in both the student experience and the teacher-facing workflow if accessibility is not documented.']
    ]
  },
  DreamBox: {
    sections: [
      '<p><strong>DreamBox</strong> is an adaptive math platform used for supplemental practice and intervention. Like other visually rich math tools, it often blends manipulatives, on-screen representations, and interactive response patterns into the lesson experience. That design can be instructionally effective while also making accessibility questions more complex than a simple multiple-choice workflow.</p>',
      '<p>DistrictCheck rates DreamBox as medium risk because public accessibility positioning exists, but a current public VPAT is not easy to verify. Districts should focus on keyboard access, screen-reader support for math interactions, use of color or motion in manipulatives, and whether adaptive lesson pathways remain understandable to students using assistive technology. Math platforms frequently need closer scrutiny because representations and interaction models are central to the learning experience.</p>',
      '<p>The district response should be to request a current VPAT, document which student groups use DreamBox, and note what alternate instructional path exists if a specific lesson type is not accessible. Medium risk here reflects a tool that may have meaningful accessibility work behind it, but still needs stronger public documentation before a district can treat it as fully defensible.</p>'
    ],
    faq: [
      ['Is DreamBox ADA compliant?', 'DistrictCheck rates DreamBox as medium risk because a current public VPAT is not clearly available and the math interaction model deserves close review.'],
      ['Does DreamBox have a VPAT?', 'Districts should request a current VPAT or accessibility conformance report directly from DreamBox.'],
      ['Why are math platforms like DreamBox harder to assess?', 'Because manipulatives, visual representations, and interactive lesson flows can create accessibility barriers that are not obvious from a marketing page alone.']
    ]
  },
  'i-Ready': {
    sections: [
      '<p><strong>i-Ready</strong> is one of the most consequential products in the K-12 stack because districts use it for diagnostic assessment, personalized instruction, and intervention planning. Accessibility questions carry more weight here than they would in a casual classroom app because i-Ready can influence instructional grouping, intervention decisions, and student support conversations.</p>',
      '<p>DistrictCheck rates i-Ready as high risk because the product is high impact while a current public VPAT is not easy to verify. Districts should be especially focused on diagnostic workflows, lesson-player navigation, keyboard support, audio controls, and whether adaptive responses or item types work consistently with assistive technology. For assessment-adjacent platforms, the burden of proof is higher because the impact on students is more direct and easier to document if something goes wrong.</p>',
      '<p>The right move is to escalate a VPAT request through Curriculum Associates and document whether the exact product modules in use are covered. If i-Ready is used in special education, intervention, or progress-monitoring contexts, the district should note that dependency clearly in the compliance file. High risk here reflects the combination of significance and unclear public documentation, not just the absence of a PDF.</p>'
    ],
    faq: [
      ['Is i-Ready ADA compliant?', 'DistrictCheck rates i-Ready as high risk because it is heavily used in assessment and intervention contexts while a current public VPAT is not clearly available.'],
      ['Does i-Ready have a VPAT?', 'Districts should request a current VPAT or accessibility conformance report directly from Curriculum Associates for the exact i-Ready product modules in use.'],
      ['Why is i-Ready considered high risk?', 'Because the platform can affect assessment, intervention, and instructional decisions, so unclear accessibility documentation creates higher district exposure.']
    ]
  },
  Lexia: {
    sections: [
      '<p><strong>Lexia</strong> is commonly used in reading intervention, literacy support, and structured student practice. It often appears in MTSS, intervention blocks, and specialized support settings where accessibility needs may already be more concentrated. That alone makes documentation quality especially important.</p>',
      '<p>DistrictCheck rates Lexia as medium risk because districts often rely on it heavily, but the public documentation picture is not as clear or current as the strongest low-risk vendors. For literacy intervention tools, districts should review audio controls, reading-order support, keyboard navigation, and whether the student experience remains usable for learners who rely on screen readers or other assistive technology. Because Lexia is often used to support students who need extra help, accessibility confidence matters even more.</p>',
      '<p>The practical next step is to request a current VPAT for the exact Lexia product in use and document how intervention staff will respond if a student cannot access the standard workflow. Medium risk reflects uncertainty rather than a proven failure, but that uncertainty still needs to be resolved if the district wants a defensible compliance record.</p>'
    ],
    faq: [
      ['Is Lexia ADA compliant?', 'DistrictCheck rates Lexia as medium risk because the public accessibility documentation picture is not clearly current enough for a clean district file.'],
      ['Does Lexia have a VPAT?', 'Districts should request a current VPAT or accessibility conformance report for the exact Lexia product in use.'],
      ['Why does Lexia deserve special review?', 'Because it is often used in literacy intervention settings where accessibility needs may already be concentrated and the student impact of barriers is immediate.']
    ]
  },
  Amplify: {
    sections: [
      '<p><strong>Amplify</strong> covers a wide range of district use cases, from curriculum delivery to literacy and science instruction. That breadth means districts cannot assume one generic accessibility statement covers every product they may have purchased. A curriculum platform, an assessment component, and a student-reader experience may all need separate confirmation.</p>',
      '<p>DistrictCheck rates Amplify as medium risk because the public documentation picture is not clear enough to treat as settled, especially given the product range involved. Districts should be asking which VPAT or conformance report applies to the exact Amplify program in use, whether student-facing readers and teacher dashboards are both covered, and how multimedia or interactive components were tested. When vendors offer families of products, the accessibility risk often comes from assuming broad coverage where only partial coverage exists.</p>',
      '<p>The district action is to request product-specific documentation, save the response, and note where Amplify sits in required instruction. If the district uses Amplify in a core subject area, documenting the product scope matters almost as much as obtaining the report itself. Medium risk here reflects a platform family that may have meaningful accessibility work behind it, but still needs clearer mapping for district compliance files.</p>'
    ],
    faq: [
      ['Is Amplify ADA compliant?', 'DistrictCheck rates Amplify as medium risk because product-specific accessibility documentation is not clearly surfaced enough to treat as settled for district use.'],
      ['Does Amplify have a VPAT?', 'Districts should request a current VPAT or accessibility conformance report for the exact Amplify product line they deploy.'],
      ['Why does product scope matter so much with Amplify?', 'Because curriculum, assessment, and student-reader workflows may not all be covered by one generic accessibility statement or document.']
    ]
  }
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function breadcrumbJsonLd(items) {
  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  })}</script>`;
}

function canonicalName(tool) {
  return tool.canonical || tool.name;
}

function canonicalTool(tool) {
  const target = tools.find((entry) => entry.name === canonicalName(tool));
  return target || tool;
}

function canonicalSlug(tool) {
  return slugify(canonicalName(tool));
}

function isAlias(tool) {
  return canonicalName(tool) !== tool.name;
}

function categoryGuidesForTool(tool) {
  return categoryGuides[canonicalName(tool)] || [];
}

function toolSeo(tool) {
  const canonical = canonicalTool(tool);
  const override = seoOverrides[canonical.name];
  if (isAlias(tool)) {
    return {
      title: `${tool.name} ADA Compliance | DistrictCheck`,
      description: `${tool.name} refers to the same product line DistrictCheck currently catalogs under ${canonical.name}. View the canonical ADA compliance page for the current risk rating and recommended district action.`
    };
  }
  if (override) return override;
  const vpat = tool.vpat.toLowerCase().startsWith('exists')
    ? `has a ${tool.vpat.toLowerCase()}`
    : `has no current VPAT (${tool.vpat.toLowerCase()})`;
  return {
    title: `${tool.name} ADA Compliance (${tierMap[tool.tier].label} Risk) | DistrictCheck`,
    description: `${tool.name} is rated ${tierMap[tool.tier].label.toLowerCase()} risk for ADA Title II. The tool ${vpat} and a ${tool.wcag.toLowerCase()} WCAG claim. See what K-12 districts should do.`
  };
}

function faqPairs(tool) {
  const canonical = canonicalTool(tool);
  const analysis = analysisContent[canonical.name];
  if (analysis) return analysis.faq;
  if (canonical.tier === 'low') {
    return [
      [`Is ${canonical.name} ADA compliant?`, `${canonical.name} is currently rated ${tierMap[canonical.tier].label.toLowerCase()} risk because DistrictCheck found a current VPAT or accessibility documentation with a specific WCAG claim, though districts should still file the current record and review partial-support notes.`],
      [`Does ${canonical.name} have a VPAT?`, `The current DistrictCheck entry for ${canonical.name} lists VPAT status as ${canonical.vpat}. Districts should keep the latest vendor documentation on file and refresh it during annual review or renewal.`],
      [`What should districts do next for ${canonical.name}?`, `Districts should retain the current documentation, note any partially supported workflows, and make sure connected third-party tools are reviewed separately.`]
    ];
  }
  return [
    [`Is ${canonical.name} ADA compliant?`, `${canonical.name} is currently rated ${tierMap[canonical.tier].label.toLowerCase()} risk in DistrictCheck based on the current VPAT status, WCAG claim, and how the tool is commonly used in K-12 settings.`],
    [`Does ${canonical.name} have a VPAT?`, `The current DistrictCheck entry for ${canonical.name} lists VPAT status as ${canonical.vpat}. Districts should request or retain the latest accessibility documentation directly from the vendor.`],
    [`What should districts do next for ${canonical.name}?`, canonical.action]
  ];
}

function faqJsonLd(tool) {
  const pairs = faqPairs(tool);
  if (!pairs || isAlias(tool)) return '';
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    }))
  };
  return `<script type="application/ld+json">${JSON.stringify(payload)}</script>`;
}

function analysisMarkup(tool) {
  const analysis = analysisContent[canonicalName(tool)];
  if (isAlias(tool)) return '';
  if (!analysis) {
    const tier = tierMap[tool.tier];
    return `
    <section class="section">
      <h2>${escapeHtml(tool.name)} accessibility analysis</h2>
      <div class="analysis-copy">
<p><strong>${escapeHtml(tool.name)}</strong> is currently rated <strong>${escapeHtml(tier.label.toLowerCase())} risk</strong> in DistrictCheck because the present documentation record shows <strong>VPAT: ${escapeHtml(tool.vpat)}</strong> and <strong>WCAG claim: ${escapeHtml(tool.wcag)}</strong>. That combination does not answer every district question on its own, but it gives a concrete starting point for how defensible the tool is today.</p>
<p>For district teams, the practical issue is whether the vendor documentation matches how the product is actually used. Tools that handle student data, required participation, assessments, communication, or multimedia creation deserve closer review because any accessibility gap can quickly become an instructional or legal problem. The strongest next step is to file the current documentation status, identify the highest-risk workflows your teachers actually use, and note whether an accommodation or alternate path is needed if a barrier appears.</p>
<p>DistrictCheck's recommendation for ${escapeHtml(tool.name)} is simple: ${escapeHtml(tool.action)} This page should be treated as a compliance snapshot, then paired with vendor outreach and local implementation notes so your district can show a timely, good-faith review process.</p>
      </div>
    </section>`;
  }
  return `
    <section class="section">
      <h2>${escapeHtml(tool.name)} accessibility analysis</h2>
      <div class="analysis-copy">
${analysis.sections.join('\n')}
      </div>
    </section>`;
}

function relatedToolsFor(tool) {
  const name = canonicalName(tool);
  const currentCanonical = canonicalTool(tool);
  const candidates = tools.filter((entry) => !isAlias(entry) && entry.name !== name);
  const sameTier = candidates.filter((entry) => entry.tier === currentCanonical.tier);
  const samePii = candidates.filter((entry) => entry.pii === currentCanonical.pii && entry.tier !== currentCanonical.tier);
  const picked = [];
  for (const candidate of [...sameTier, ...samePii, ...candidates]) {
    if (!picked.find((entry) => entry.name === candidate.name)) picked.push(candidate);
    if (picked.length === 3) break;
  }
  return picked;
}

function relatedMarkup(tool) {
  return relatedToolsFor(tool)
    .map((entry) => `<a class="related-link" href="./${canonicalSlug(entry)}.html">Districts using ${escapeHtml(canonicalName(tool))} often also use ${escapeHtml(entry.name)} &rarr;</a>`)
    .join('\n');
}

function blogPostsForTool(tool) {
  const name = canonicalName(tool);
  const matched = blogPosts.filter((post) => post.tools.includes(name));
  if (matched.length) return matched.slice(0, 3);
  return [blogPosts[0], blogPosts[1], blogPosts[2]];
}

function blogMarkup(tool) {
  return blogPostsForTool(tool)
    .map((post) => `<a class="related-link" href="../blog/${post.slug}">${escapeHtml(post.title)} &rarr;</a>`)
    .join('\n');
}

function categoryMarkup(tool) {
  const guides = categoryGuidesForTool(tool);
  if (!guides.length || isAlias(tool)) return '';
  const links = guides
    .map((guide) => `<a class="related-link" href="${guide.href}">Compare ${escapeHtml(canonicalName(tool))} in the ${escapeHtml(guide.title)} &rarr;</a>`)
    .join('\n');
  return `
    <section class="section">
      <h2>Category guides for ${escapeHtml(canonicalName(tool))}</h2>
      <p class="lead">Use these comparison pages to see how ${escapeHtml(canonicalName(tool))} fits into broader district procurement and accessibility decisions.</p>
      <div class="related-stack">
${links}
      </div>
    </section>`;
}

function vendorTemplateMarkup(tool) {
  if (isAlias(tool) || !['critical', 'high'].includes(tool.tier)) return '';
  return `
    <section class="section">
      <div class="panel">
        <div class="label">Vendor outreach</div>
        <h2 style="margin-top:0;">Need a VPAT from this vendor?</h2>
        <p class="lead" style="margin-bottom:18px;">Use DistrictCheck's copy-paste outreach templates to request a VPAT, follow up if needed, and document your good-faith compliance effort.</p>
        <div class="hero-actions">
          <a class="btn primary" href="../resources/vendor-vpat-request-template.html">Request a VPAT from this vendor</a>
          <a class="btn secondary" href="../resources/wcag-checklist-edtech.html">Review the WCAG checklist</a>
        </div>
      </div>
    </section>`;
}

function toolDirectoryPage() {
  const canonicalTools = tools.filter((tool) => !isAlias(tool)).sort((a, b) => a.name.localeCompare(b.name));
  const cards = canonicalTools.map((tool) => {
    const slug = slugify(tool.name);
    const tier = tierMap[tool.tier];
    return `        <a class="tool-card" href="./${slug}.html">
          <span class="tool-card-top">
            <span class="tool-card-name">${escapeHtml(tool.name)}</span>
            <span class="tool-card-tier ${tool.tier}">${escapeHtml(tier.label)}</span>
          </span>
          <span class="tool-card-meta">VPAT: ${escapeHtml(tool.vpat)} · WCAG: ${escapeHtml(tool.wcag)}</span>
        </a>`;
  }).join('\n');
  const seo = seoOverrides['Tool Database'];
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(seo.title)}</title>
  <meta name="description" content="${escapeHtml(seo.description)}" />
  <meta name="robots" content="index,follow" />
  <link rel="canonical" href="https://districtcheck.io/tools/index.html" />
  <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
  <meta property="og:title" content="${escapeHtml(seo.title)}" />
  <meta property="og:description" content="${escapeHtml(seo.description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://districtcheck.io/tools/index.html" />
  <meta property="og:site_name" content="DistrictCheck" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
  <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    :root {
      --bg: #0e1013;
      --surface: #16191e;
      --border: #272c35;
      --text: #d8dce3;
      --muted: #7b8490;
      --white: #ffffff;
      --accent: #5254cc;
    }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      background: linear-gradient(180deg, #101319 0%, var(--bg) 40%);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }
    .skip-link {
      position: absolute;
      left: 20px;
      top: 16px;
      transform: translateY(-180%);
      background: var(--white);
      color: var(--bg);
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      z-index: 1000;
      transition: transform 0.15s ease;
    }
    .skip-link:focus {
      transform: translateY(0);
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
    .wrap { width: min(1120px, calc(100% - 40px)); margin: 0 auto; }
    nav {
      padding: 22px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .logo { font-size: 18px; font-weight: 800; color: var(--white); letter-spacing: -0.02em; }
    .logo em { font-style: normal; color: var(--accent); }
    .nav-link { font-size: 13px; color: var(--muted); }
    .hero { padding: 44px 0 28px; }
    .eyebrow {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 700;
      color: var(--muted);
      margin-bottom: 16px;
    }
    h1 {
      margin: 0 0 12px;
      font-size: clamp(36px, 6vw, 58px);
      line-height: 1.03;
      letter-spacing: -0.045em;
      color: var(--white);
    }
    .hero p {
      margin: 0;
      color: var(--muted);
      font-size: 17px;
      max-width: 70ch;
    }
    .tool-grid {
      padding: 24px 0 56px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
    }
    .tool-card {
      background: rgba(22,25,30,0.92);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 18px 20px;
      display: block;
      transition: border-color 0.15s, transform 0.15s;
    }
    .tool-card:hover {
      border-color: rgba(99,102,241,0.45);
      transform: translateY(-1px);
    }
    .tool-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }
    .tool-card-name {
      color: var(--white);
      font-size: 17px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .tool-card-tier {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 5px 9px;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .tool-card-tier.critical { color: #fca5a5; background: rgba(239,68,68,0.12); }
    .tool-card-tier.high { color: #fdba74; background: rgba(249,115,22,0.12); }
    .tool-card-tier.medium { color: #fcd34d; background: rgba(245,158,11,0.12); }
    .tool-card-tier.low { color: #86efac; background: rgba(34,197,94,0.12); }
    .tool-card-meta { color: var(--muted); font-size: 13px; display: block; }
    footer {
      border-top: 1px solid var(--border);
      padding: 24px 0 40px;
      color: var(--muted);
      font-size: 12px;
    }
    @media (max-width: 760px) {
      .tool-grid { grid-template-columns: 1fr; }
      .wrap { width: min(1120px, calc(100% - 24px)); }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div class="wrap">
    <nav aria-label="Main navigation">
      <a class="logo" href="../index.html" aria-label="DistrictCheck">District<em>Check</em></a>
      <a class="nav-link" href="../index.html">Back to homepage</a>
    </nav>
    <main id="main-content">
    <section class="hero">
      <div class="eyebrow">Tool Database</div>
      <h1>Browse all tools</h1>
      <p>Explore the full DistrictCheck edtech tool database. Each page summarizes ADA compliance risk, VPAT status, WCAG claims, and what districts should do next.</p>
    </section>
    <section class="tool-grid">
${cards}
    </section>
    </main>
    <footer>Copyright 2026 DistrictCheck · ADA Title II · WCAG 2.1 AA · K-12</footer>
  </div>
</body>
</html>`;
}

function page(tool) {
  const canonical = canonicalTool(tool);
  const tier = tierMap[canonical.tier];
  const seo = toolSeo(tool);
  const slug = slugify(tool.name);
  const canonicalHref = `https://districtcheck.io/tools/${canonicalSlug(tool)}`;
  const breadcrumbScript = breadcrumbJsonLd([
    { name: 'Home', item: 'https://districtcheck.io/' },
    { name: 'Tools', item: 'https://districtcheck.io/tools/' },
    { name: canonical.name, item: canonicalHref }
  ]);
  const aliasNote = isAlias(tool)
    ? `<div class="callout"><div class="label">Canonical page</div><p>${escapeHtml(tool.name)} is currently consolidated under <a href="./${canonicalSlug(tool)}.html" style="text-decoration:underline;">${escapeHtml(canonical.name)}</a> so DistrictCheck does not split authority across duplicate product pages.</p></div>`
    : '';
  const faqScript = faqJsonLd(tool);
  const writtenAnalysis = analysisMarkup(tool);
  const categoryLinks = categoryMarkup(tool);
  const relatedLinks = relatedMarkup(tool);
  const relatedBlogLinks = blogMarkup(tool);
  const tierLabel = tier.label;
  const toolName = escapeHtml(tool.name);
  const action = escapeHtml(tool.action);
  const vpat = escapeHtml(tool.vpat);
  const wcag = escapeHtml(tool.wcag);
  const pii = escapeHtml(tool.pii);
  const auditHref = '../audit/index.html';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(seo.title)}</title>
  <meta name="description" content="${escapeHtml(seo.description)}" />
  <meta name="robots" content="index,follow" />
  <link rel="canonical" href="${canonicalHref}" />
  <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
  <meta property="og:title" content="${escapeHtml(seo.title)}" />
  <meta property="og:description" content="${escapeHtml(seo.description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://districtcheck.io/tools/${slug}" />
  <meta property="og:site_name" content="DistrictCheck" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
  <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
  ${breadcrumbScript}
  ${faqScript}
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    :root {
      --bg: #0e1013;
      --surface: #16191e;
      --card: #1c2027;
      --border: #272c35;
      --text: #d8dce3;
      --muted: #7b8490;
      --white: #ffffff;
      --accent: ${tier.accent};
      --accent-soft: ${tier.glow};
    }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      background:
        radial-gradient(circle at top right, var(--accent-soft), transparent 28%),
        linear-gradient(180deg, #101319 0%, var(--bg) 42%);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }
    .skip-link {
      position: absolute;
      left: 20px;
      top: 16px;
      transform: translateY(-180%);
      background: var(--white);
      color: var(--bg);
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      z-index: 1000;
      transition: transform 0.15s ease;
    }
    .skip-link:focus {
      transform: translateY(0);
      outline: 2px solid var(--white);
      outline-offset: 2px;
    }
    .wrap { width: min(1120px, calc(100% - 40px)); margin: 0 auto; }
    nav {
      padding: 22px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .logo { font-size: 18px; font-weight: 800; color: var(--white); letter-spacing: -0.02em; }
    .logo em { font-style: normal; color: var(--accent); }
    .nav-links { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
    .nav-link { font-size: 13px; color: var(--muted); }
    .nav-cta {
      background: var(--accent);
      color: var(--bg);
      padding: 10px 16px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 700;
    }
    .hero {
      padding: 44px 0 36px;
      display: grid;
      grid-template-columns: 1.3fr 0.9fr;
      gap: 28px;
      align-items: start;
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: var(--muted);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 700;
      margin-bottom: 18px;
    }
    .eyebrow::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 18px var(--accent);
    }
    h1 {
      margin: 0 0 16px;
      font-size: clamp(36px, 6vw, 60px);
      line-height: 1.03;
      letter-spacing: -0.045em;
      color: var(--white);
    }
    .hero-copy p {
      margin: 0 0 22px;
      color: var(--muted);
      font-size: 18px;
      max-width: 62ch;
    }
    .hero-copy strong { color: var(--text); }
    .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 18px;
      border-radius: 12px;
      border: 1px solid var(--border);
      font-size: 14px;
      font-weight: 700;
    }
    .btn.primary { background: var(--accent); border-color: transparent; color: var(--bg); }
    .btn.secondary { background: rgba(255,255,255,0.02); color: var(--text); }
    .panel, .card {
      background: rgba(22,25,30,0.9);
      border: 1px solid var(--border);
      border-radius: 18px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.28);
    }
    .panel { padding: 22px; }
    .panel-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
    }
    .panel-title { color: var(--white); font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      background: var(--accent-soft);
      color: var(--white);
      border: 1px solid rgba(255,255,255,0.08);
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 14px;
    }
    .stat {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 14px;
    }
    .label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
      margin-bottom: 6px;
      font-weight: 700;
    }
    .value { font-size: 15px; color: var(--white); font-weight: 700; }
    .callout {
      background: linear-gradient(135deg, var(--accent-soft), rgba(255,255,255,0.02));
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 14px;
      padding: 16px;
    }
    .callout p { margin: 0; font-size: 14px; color: var(--text); }
    .section { padding: 24px 0; }
    .section h2 {
      margin: 0 0 10px;
      font-size: clamp(24px, 3vw, 34px);
      letter-spacing: -0.03em;
      line-height: 1.1;
      color: var(--white);
    }
    .section p.lead {
      margin: 0 0 24px;
      color: var(--muted);
      max-width: 70ch;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }
    .card { padding: 22px; }
    .card p { margin: 0; font-size: 15px; color: var(--muted); }
    .card strong { color: var(--text); }
    .steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    .step-num {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--accent-soft);
      color: var(--white);
      font-size: 12px;
      font-weight: 800;
      margin-bottom: 12px;
    }
    .step h3, .faq h3 {
      margin: 0 0 8px;
      color: var(--white);
      font-size: 16px;
    }
    .step p, .faq p {
      margin: 0;
      color: var(--muted);
      font-size: 14px;
    }
    .analysis-copy {
      display: grid;
      gap: 18px;
      font-size: 15px;
      color: var(--muted);
      max-width: 76ch;
    }
    .analysis-copy strong { color: var(--text); }
    .faq-list, .related-stack {
      display: grid;
      gap: 14px;
    }
    .related-link {
      display: block;
      padding: 16px 18px;
      background: rgba(22,25,30,0.92);
      border: 1px solid var(--border);
      border-radius: 14px;
      color: var(--text);
      font-size: 14px;
      transition: border-color 0.15s, transform 0.15s;
    }
    .related-link:hover {
      border-color: rgba(255,255,255,0.18);
      transform: translateY(-1px);
    }
    footer {
      border-top: 1px solid var(--border);
      padding: 26px 0 40px;
      color: var(--muted);
      font-size: 12px;
    }
    @media (max-width: 900px) {
      .hero, .grid, .steps { grid-template-columns: 1fr; }
      .stats { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .wrap { width: min(1120px, calc(100% - 24px)); }
      nav { padding: 18px 0; }
      .nav-links { gap: 10px; }
      .hero { padding-top: 28px; }
      .hero-copy p { font-size: 16px; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div class="wrap">
    <nav aria-label="Main navigation">
      <a class="logo" href="../index.html" aria-label="DistrictCheck">District<em>Check</em></a>
      <div class="nav-links">
        <a class="nav-link" href="../index.html#how-it-works">How it works</a>
        <a class="nav-link" href="../index.html#full-audit">Full audit</a>
        <a class="nav-cta" href="${auditHref}">Get full audit</a>
      </div>
    </nav>
    <main id="main-content">
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">${escapeHtml(tier.eyebrow)} · K-12 Accessibility Review</div>
        <h1>${toolName} ADA Compliance</h1>
        <p>${toolName} ADA compliance is currently rated <strong>${escapeHtml(tierLabel)} risk</strong> in the DistrictCheck tool database. This page summarizes the current VPAT status, WCAG claim, student data exposure, and the next action a district should take.</p>
        <div class="hero-actions">
          <a class="btn primary" href="${auditHref}">Audit your full stack</a>
          <a class="btn secondary" href="../index.html">Check another tool</a>
        </div>
      </div>

      <aside class="panel">
        <div class="panel-top">
          <div class="panel-title">${toolName}</div>
          <div class="badge">${escapeHtml(tierLabel)}</div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="label">VPAT status</div>
            <div class="value">${vpat}</div>
          </div>
          <div class="stat">
            <div class="label">WCAG 2.1 claim</div>
            <div class="value">${wcag}</div>
          </div>
          <div class="stat">
            <div class="label">Handles student PII</div>
            <div class="value">${pii}</div>
          </div>
        </div>
        <div class="callout">
          <div class="label">Recommended action</div>
          <p>${action}</p>
        </div>
      </aside>
    </section>

    ${aliasNote}

    <section class="section">
      <h2>What ${toolName} ADA compliance means for districts</h2>
      <p class="lead">${escapeHtml(tier.summary)} ${escapeHtml(tier.nextStep)}</p>
      <div class="grid">
        <article class="card">
          <div class="label">Current finding</div>
          <p><strong>${toolName}</strong> is marked as <strong>${escapeHtml(tier.label.toLowerCase())} risk</strong> because the current database entry lists <strong>VPAT: ${vpat}</strong> and <strong>WCAG claim: ${wcag}</strong>.</p>
        </article>
        <article class="card">
          <div class="label">District implication</div>
          <p>${canonical.pii === 'Yes' ? 'Because the tool handles student data, documentation gaps create a more urgent ADA Title II compliance and procurement issue.' : 'Even without student PII, classroom use can still create ADA Title II risk if the tool is used in instruction or assessment.'}</p>
        </article>
      </div>
    </section>

    ${writtenAnalysis}

    ${categoryLinks}

    <section class="section">
      <h2>Next steps for ${toolName} ADA compliance</h2>
      <p class="lead">Use this sequence to document a reasonable, good-faith accessibility review for ${toolName} before or during renewal.</p>
      <div class="steps">
        <article class="card step">
          <div class="step-num">1</div>
          <h3>File the current finding</h3>
          <p>Save this rating, the VPAT status, and the WCAG claim in your district accessibility review log.</p>
        </article>
        <article class="card step">
          <div class="step-num">2</div>
          <h3>Contact the vendor</h3>
          <p>${action}</p>
        </article>
        <article class="card step">
          <div class="step-num">3</div>
          <h3>Document the interim plan</h3>
          <p>Record any accommodations, alternate workflows, or annual review notes tied to ${toolName} so your compliance file is complete.</p>
        </article>
      </div>
      <div class="panel" style="margin-top:18px;">
        <div class="label">Need a district-wide answer?</div>
        <p class="lead" style="margin-bottom:18px;">The fastest next step after checking ${toolName} is to audit the full district stack. DistrictCheck's $1,500 pilot covers up to 15 tools, documents the risk tier for each one, and prepares the vendor outreach trail your district can file.</p>
        <div class="hero-actions">
          <a class="btn secondary" href="${auditHref}">Book your district audit — $1,500</a>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>${toolName} ADA compliance FAQ</h2>
      <div class="faq-list">
        <article class="card faq">
          <h3>Is ${toolName} ADA compliant?</h3>
          <p>DistrictCheck currently rates ${toolName} as <strong>${escapeHtml(tier.label.toLowerCase())} risk</strong>, based on the tool database entry for its VPAT status, WCAG claim, and usage context.</p>
        </article>
        <article class="card faq">
          <h3>Does ${toolName} have a VPAT?</h3>
          <p>The current database entry shows <strong>${vpat}</strong>. Districts should verify whether a newer VPAT or accessibility conformance report is available directly from the vendor.</p>
        </article>
        <article class="card faq">
          <h3>What should districts do next?</h3>
          <p>${action}</p>
        </article>
      </div>
    </section>

    <section class="section">
      <h2>Related tools in district stacks</h2>
      <p class="lead">These internal links help you compare adjacent tools and build a fuller picture of district-wide accessibility risk.</p>
      <div class="related-stack">
${relatedLinks}
      </div>
    </section>

    <section class="section">
      <h2>Related reading</h2>
      <p class="lead">These DistrictCheck articles add policy context and practical guidance related to ${toolName}.</p>
      <div class="related-stack">
${relatedBlogLinks}
      </div>
    </section>

    ${vendorTemplateMarkup(tool)}

    <section class="section">
      <div class="panel">
        <div class="label">Need the full picture?</div>
        <h2 style="margin-top:0;">One tool is useful. The full stack is what matters.</h2>
        <p class="lead" style="margin-bottom:18px;">Districts rarely use just one platform. DistrictCheck can review your full edtech stack, assign a risk tier to each tool, and prepare vendor outreach language for the ones that need documentation.</p>
        <div class="hero-actions">
          <a class="btn primary" href="${auditHref}">Request full audit</a>
          <a class="btn secondary" href="../blog/index.html">Read the blog</a>
          <a class="btn secondary" href="./index.html">Browse all tools</a>
          <a class="btn secondary" href="../index.html">Return to lookup</a>
        </div>
      </div>
    </section>
    </main>

    <footer>
      <div>Copyright 2026 DistrictCheck · ADA Title II · WCAG 2.1 AA · K-12</div>
    </footer>
  </div>
</body>
</html>`;
}

function sitemapXml() {
  const urls = [
    { loc: 'https://districtcheck.io/', lastmod: DEFAULT_LASTMOD },
    { loc: 'https://districtcheck.io/blog/', lastmod: BLOG_INDEX_LASTMOD },
    ...blogPosts.map((post) => ({ loc: `https://districtcheck.io/blog/${post.slug.replace('.html', '')}`, lastmod: post.lastmod })),
    ...staticPages,
    { loc: 'https://districtcheck.io/tools/', lastmod: DEFAULT_LASTMOD },
    ...tools.filter((tool) => !isAlias(tool)).map((tool) => ({ loc: `https://districtcheck.io/tools/${slugify(tool.name)}`, lastmod: DEFAULT_LASTMOD }))
  ];
  const entries = urls.map((url) => `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod}</lastmod>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

const outputDir = path.join(process.cwd(), 'tools');
fs.mkdirSync(outputDir, { recursive: true });

for (const tool of tools) {
  fs.writeFileSync(path.join(outputDir, `${slugify(tool.name)}.html`), page(tool));
}

fs.writeFileSync(path.join(outputDir, 'index.html'), toolDirectoryPage());
fs.writeFileSync(path.join(process.cwd(), 'sitemap.xml'), sitemapXml());

console.log(`Generated ${tools.length} tool pages, tools index, and sitemap in ${process.cwd()}`);
