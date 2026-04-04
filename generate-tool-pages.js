const fs = require('fs');
const path = require('path');

const DEFAULT_LASTMOD = '2026-04-04';
const BLOG_INDEX_LASTMOD = '2026-04-04';

const blogPosts = [
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
  { name: 'ClassDojo', tier: 'critical', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Send vendor outreach requesting a VPAT and WCAG 2.1 AA conformance statement before April 24. Document the send date - this is your good-faith compliance record.' },
  { name: 'Formative', tier: 'critical', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Send vendor outreach immediately. If no VPAT is received before April 24, document an accessible alternative assessment pathway for students who need it.' },
  { name: 'GoFormative', tier: 'critical', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Send vendor outreach immediately. If no VPAT is received before April 24, document an accessible alternative assessment pathway for students who need it.' },
  { name: 'Edulastic', tier: 'critical', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Send outreach today. Loop in your Special Education Director - any student with an IEP or 504 taking Edulastic assessments needs a documented accessibility accommodation pathway now.' },
  { name: 'Nearpod', tier: 'high', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', action: 'Request a current VPAT and written conformance statement. Flag interactive elements (drag-and-drop, timed activities) as specific areas needing documentation.' },
  { name: 'IXL', tier: 'high', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', action: 'Request VPAT. Specifically flag the math input interface and timed activities - these have documented barriers for keyboard and screen reader users.' },
  { name: 'IXL Learning', tier: 'high', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', canonical: 'IXL', action: 'Request VPAT. Specifically flag the math input interface and timed activities - these have documented barriers for keyboard and screen reader users.' },
  { name: 'Remind', tier: 'high', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Request VPAT. If Remind is used for emergency communications, also document an accessible alternative channel (email + robocall) as an interim measure.' },
  { name: 'Kahoot', tier: 'high', vpat: 'Not found', wcag: 'Aspirational', pii: 'No', action: 'Vendor explicitly states "working toward WCAG 2.1 AA" - that confirms non-conformance. If used for graded activities, document an alternative assessment option for students who need it.' },
  { name: 'Quizlet', tier: 'high', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', action: 'Request VPAT. Note that Quizlet Live (timed, competitive format) has structural accessibility barriers - flag for any teacher using it for assessed activities.' },
  { name: 'CommonLit', tier: 'high', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Send vendor outreach requesting VPAT. The complete absence of public accessibility documentation is itself the primary finding.' },
  { name: 'ReadWorks', tier: 'high', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Send outreach - but expect a slow response given nonprofit capacity. Document the attempt regardless. Consider whether accessible alternatives exist for literary instruction.' },
  { name: 'ParentSquare', tier: 'high', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Request VPAT immediately. As a primary parent communication channel, this falls squarely in ADA Title II scope. Document an accessible alternative communication process in the interim.' },
  { name: 'Screencastify', tier: 'high', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Request VPAT. Also verify whether student video recordings are stored on Screencastify servers - if so, confirm data handling agreements.' },
  { name: 'Schoology', tier: 'high', vpat: 'Unclear post-acquisition', wcag: 'Vague claim', pii: 'Yes', action: 'Call PowerSchool directly (not web form) and ask to be connected to their accessibility team. Request a current VPAT specifically for the Schoology parent portal.' },
  { name: 'Padlet', tier: 'high', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', action: 'Request VPAT. The collaborative board format has known barriers for screen reader users - specifically ask about navigation between posts and keyboard accessibility.' },
  { name: 'Prodigy', tier: 'high', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Request VPAT. Game-based math format has inherent accessibility concerns similar to Kahoot - flag timed and interactive elements.' },
  { name: 'Boom Learning', tier: 'high', vpat: 'Not found', wcag: 'No claim', pii: 'Yes', action: 'Request VPAT immediately. Boom Cards is widely used but has limited accessibility documentation for a student-facing assessment platform.' },
  { name: 'Wakelet', tier: 'high', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', action: 'Request VPAT. Content curation interface has reported keyboard navigation issues.' },
  { name: 'Seesaw', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', action: 'Download and file the existing VPAT from Seesaw\'s accessibility page. Note that portfolio creation tools are partially conformant - advise teachers that students needing accessible alternatives should have them documented.' },
  { name: 'BrainPOP', tier: 'medium', vpat: 'Exists (2022)', wcag: 'Specific claim', pii: 'Yes', action: 'Request an updated VPAT (2024 or later). Also ask specifically about legacy video content captioning accuracy.' },
  { name: 'Pear Deck', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', action: 'File the existing VPAT. Note that freehand drawing and annotation tools are partially conformant - ensure text-based alternatives are available.' },
  { name: 'Newsela', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', action: 'File the existing VPAT. Low risk - add to annual review cycle.' },
  { name: 'Flip', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', action: 'Download and file the VPAT through Microsoft\'s accessibility documentation. Advise teachers that AI-generated captions on student-uploaded videos should be reviewed before class viewing.' },
  { name: 'Flipgrid', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', canonical: 'Flip', action: 'Download and file the VPAT through Microsoft\'s accessibility documentation. Advise teachers that AI-generated captions on student-uploaded videos should be reviewed before class viewing.' },
  { name: 'Discovery Education', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', action: 'File existing VPAT. Note partial conformance for interactive simulations and virtual labs. Review at next contract renewal.' },
  { name: 'Canva for Education', tier: 'medium', vpat: 'Exists (2023)', wcag: 'Specific claim', pii: 'Yes', action: 'File existing VPAT. Canva has improved accessibility significantly but some advanced design features remain partially conformant.' },
  { name: 'Book Creator', tier: 'medium', vpat: 'Not found', wcag: 'Vague claim', pii: 'Yes', action: 'Request VPAT. Core reading features are generally accessible but the creation interface has reported barriers for users relying on assistive technology.' },
  { name: 'Duolingo', tier: 'medium', vpat: 'Not found', wcag: 'Specific claim', pii: 'Yes', action: 'Request VPAT. Duolingo makes WCAG claims but no formal VPAT is published. Game-based timed activities warrant specific documentation.' },
  { name: 'Google Classroom', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Retain current VPAT on file. Add to annual accessibility review cycle. Check for updates when renewing Google Workspace contract. No immediate action needed.' },
  { name: 'Google Workspace', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Retain current VPAT on file. Google Workspace for Education has one of the most comprehensive accessibility programs in edtech. No immediate action needed.' },
  { name: 'Canvas', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Retain current VPAT on file. Note: LTI-embedded tools within Canvas are NOT covered by Canvas\'s VPAT - they require separate accessibility verification.' },
  { name: 'Khan Academy', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Download and file from Khan Academy\'s accessibility page. Some interactive exercise types (graphing tools) have noted limitations - proactively disclosed. No immediate action needed.' },
  { name: 'Microsoft Teams', tier: 'low', vpat: 'Exists (2024)', wcag: 'Specific claim', pii: 'Yes', action: 'Retain current VPAT on file. Microsoft has one of the strongest accessibility programs in enterprise software. No immediate action needed.' }
];

const tierMap = {
  critical: { label: 'Critical', eyebrow: 'Critical Risk', accent: '#ef4444', glow: 'rgba(239,68,68,0.20)', summary: 'This tool has the highest level of ADA compliance risk in the database because public documentation is missing and the tool is student-facing.', nextStep: 'Immediate outreach and an interim accessible alternative should be documented before the ADA Title II deadline.' },
  high: { label: 'High', eyebrow: 'High Risk', accent: '#f97316', glow: 'rgba(249,115,22,0.20)', summary: 'This tool shows elevated ADA compliance risk because the VPAT is missing, unclear, or paired with weak accessibility claims.', nextStep: 'Districts should request updated documentation now and flag likely problem areas for review.' },
  medium: { label: 'Medium', eyebrow: 'Medium Risk', accent: '#f59e0b', glow: 'rgba(245,158,11,0.20)', summary: 'This tool has some accessibility documentation, but there are still gaps, dated materials, or partially conformant features to track.', nextStep: 'Districts should file current documentation and note any areas where accommodations may still be needed.' },
  low: { label: 'Low', eyebrow: 'Low Risk', accent: '#22c55e', glow: 'rgba(34,197,94,0.20)', summary: 'This tool is one of the stronger ADA compliance entries in the database, with current documentation and a specific WCAG claim.', nextStep: 'The main task is retention, annual review, and checking for updates at renewal time.' }
};

const seoOverrides = {
  ClassDojo: {
    title: 'ClassDojo ADA Compliance (Critical Risk) | DistrictCheck',
    description: 'ClassDojo has no VPAT and no WCAG claim - critical ADA risk. See the specific accessibility gaps and the exact email to send your vendor.'
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
    title: 'Kahoot ADA Compliance (High Risk) | DistrictCheck',
    description: 'Kahoot has no VPAT and only an aspirational WCAG claim - high ADA risk. See the key barriers and what your district should do before the deadline.'
  },
  Prodigy: {
    title: 'Prodigy Math ADA Compliance (High Risk) | DistrictCheck',
    description: 'Prodigy Math has no VPAT and no WCAG claim - high ADA risk. See the accessibility gaps in its game interface and what to request from the vendor.'
  },
  Nearpod: {
    title: 'Nearpod ADA Compliance (High Risk) | DistrictCheck',
    description: 'Nearpod has no VPAT and a vague WCAG claim - high ADA risk, especially for real-time classroom activities. See gaps and next steps for your district.'
  },
  Padlet: {
    title: 'Padlet ADA Compliance (High Risk) | DistrictCheck',
    description: 'Padlet has no VPAT and a vague WCAG claim - high ADA risk. The canvas interface creates known screen reader barriers. See what districts should do.'
  },
  'Google Classroom': {
    title: 'Google Classroom ADA Compliance (Low Risk) | DistrictCheck',
    description: 'Google Classroom has a current VPAT and specific WCAG claim - low ADA risk. See what is covered, what is partially supported, and what districts should file.'
  },
  'Tool Database': {
    title: 'Edtech ADA Compliance Database | DistrictCheck',
    description: 'Browse 35+ edtech tools with ADA risk ratings, VPAT status, and WCAG notes. See where your district stands before the April deadline.'
  }
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
  return {
    title: `${tool.name} ADA Compliance (${tierMap[tool.tier].label} Risk) | DistrictCheck`,
    description: `${tool.name} ADA compliance review for K-12 districts: ${tool.tier} risk, VPAT ${tool.vpat.toLowerCase()}, WCAG claim ${tool.wcag.toLowerCase()}, and recommended next steps.`
  };
}

function faqJsonLd(tool) {
  const analysis = analysisContent[canonicalName(tool)];
  if (!analysis) return '';
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: analysis.faq.map(([question, answer]) => ({
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
  if (!analysis || isAlias(tool)) return '';
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
    .map((entry) => `<a class="related-link" href="./${slugify(entry.name)}.html">Districts using ${escapeHtml(tool.name)} often also use ${escapeHtml(entry.name)} &rarr;</a>`)
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
  <meta property="og:image" content="https://districtcheck.io/og-default.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
  <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
  <meta name="twitter:image" content="https://districtcheck.io/og-default.svg" />
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    :root {
      --bg: #0e1013;
      --surface: #16191e;
      --border: #272c35;
      --text: #d8dce3;
      --muted: #7b8490;
      --white: #ffffff;
      --accent: #6366f1;
    }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      background: linear-gradient(180deg, #101319 0%, var(--bg) 40%);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }
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
  <div class="wrap">
    <nav>
      <a class="logo" href="../index.html">District<em>Check</em></a>
      <a class="nav-link" href="../index.html">Back to homepage</a>
    </nav>
    <section class="hero">
      <div class="eyebrow">Tool Database</div>
      <h1>Browse all tools</h1>
      <p>Explore the full DistrictCheck edtech tool database. Each page summarizes ADA compliance risk, VPAT status, WCAG claims, and what districts should do next.</p>
    </section>
    <section class="tool-grid">
${cards}
    </section>
    <footer>DistrictCheck · ADA Title II · WCAG 2.1 AA · K-12</footer>
  </div>
</body>
</html>`;
}

function page(tool) {
  const canonical = canonicalTool(tool);
  const tier = tierMap[canonical.tier];
  const seo = toolSeo(tool);
  const slug = slugify(tool.name);
  const canonicalHref = `https://districtcheck.io/tools/${canonicalSlug(tool)}.html`;
  const aliasNote = isAlias(tool)
    ? `<div class="callout"><div class="label">Canonical page</div><p>${escapeHtml(tool.name)} is currently consolidated under <a href="./${canonicalSlug(tool)}.html" style="text-decoration:underline;">${escapeHtml(canonical.name)}</a> so DistrictCheck does not split authority across duplicate product pages.</p></div>`
    : '';
  const faqScript = faqJsonLd(tool);
  const writtenAnalysis = analysisMarkup(tool);
  const relatedLinks = relatedMarkup(tool);
  const relatedBlogLinks = blogMarkup(tool);
  const tierLabel = tier.label;
  const toolName = escapeHtml(tool.name);
  const action = escapeHtml(tool.action);
  const vpat = escapeHtml(tool.vpat);
  const wcag = escapeHtml(tool.wcag);
  const pii = escapeHtml(tool.pii);
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
  <meta property="og:url" content="https://districtcheck.io/tools/${slug}.html" />
  <meta property="og:site_name" content="DistrictCheck" />
  <meta property="og:image" content="https://districtcheck.io/og-default.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
  <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
  <meta name="twitter:image" content="https://districtcheck.io/og-default.svg" />
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
      color: var(--white);
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
    .btn.primary { background: var(--accent); border-color: transparent; color: var(--white); }
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
  <div class="wrap">
    <nav>
      <a class="logo" href="../index.html">District<em>Check</em></a>
      <div class="nav-links">
        <a class="nav-link" href="../index.html#how-it-works">How it works</a>
        <a class="nav-link" href="../index.html#full-audit">Full audit</a>
        <a class="nav-cta" href="https://docs.google.com/forms/d/e/1FAIpQLSdQJKWQ0HhmANtrWZZ29Cdk5tfqPrRim3R5zFWS_cPN5RDEZg/viewform?usp=dialog">Get full audit</a>
      </div>
    </nav>

    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">${escapeHtml(tier.eyebrow)} · K-12 Accessibility Review</div>
        <h1>${toolName} ADA Compliance</h1>
        <p>${toolName} ADA compliance is currently rated <strong>${escapeHtml(tierLabel)} risk</strong> in the DistrictCheck tool database. This page summarizes the current VPAT status, WCAG claim, student data exposure, and the next action a district should take.</p>
        <div class="hero-actions">
          <a class="btn primary" href="https://docs.google.com/forms/d/e/1FAIpQLSdQJKWQ0HhmANtrWZZ29Cdk5tfqPrRim3R5zFWS_cPN5RDEZg/viewform?usp=dialog">Audit your full stack</a>
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

    <section class="section">
      <div class="panel">
        <div class="label">Need the full picture?</div>
        <h2 style="margin-top:0;">One tool is useful. The full stack is what matters.</h2>
        <p class="lead" style="margin-bottom:18px;">Districts rarely use just one platform. DistrictCheck can review your full edtech stack, assign a risk tier to each tool, and prepare vendor outreach language for the ones that need documentation.</p>
        <div class="hero-actions">
          <a class="btn primary" href="https://docs.google.com/forms/d/e/1FAIpQLSdQJKWQ0HhmANtrWZZ29Cdk5tfqPrRim3R5zFWS_cPN5RDEZg/viewform?usp=dialog">Request full audit</a>
          <a class="btn secondary" href="../blog/index.html">Read the blog</a>
          <a class="btn secondary" href="./index.html">Browse all tools</a>
          <a class="btn secondary" href="../index.html">Return to lookup</a>
        </div>
      </div>
    </section>

    <footer>
      <div>DistrictCheck · ADA Title II · WCAG 2.1 AA · K-12</div>
    </footer>
  </div>
</body>
</html>`;
}

function sitemapXml() {
  const urls = [
    { loc: 'https://districtcheck.io/', lastmod: DEFAULT_LASTMOD },
    { loc: 'https://districtcheck.io/blog/index.html', lastmod: BLOG_INDEX_LASTMOD },
    ...blogPosts.map((post) => ({ loc: `https://districtcheck.io/blog/${post.slug}`, lastmod: post.lastmod })),
    { loc: 'https://districtcheck.io/tools/index.html', lastmod: DEFAULT_LASTMOD },
    ...tools.filter((tool) => !isAlias(tool)).map((tool) => ({ loc: `https://districtcheck.io/tools/${slugify(tool.name)}.html`, lastmod: DEFAULT_LASTMOD }))
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
