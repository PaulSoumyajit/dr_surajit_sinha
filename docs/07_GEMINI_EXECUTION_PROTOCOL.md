# 07 — GEMINI EXECUTION PROTOCOL & OPERATIONAL WORKFLOW

**Project:** Surojit Sinha — Advocate & Legal Counsel Personal Brand Website  
**Creative Direction:** Editorial Legal Minimalism  
**Document Status:** Approved Engineering Protocol  
**Target Engine:** Gemini 3.8 / Gemini Flash  

---

## 1. Core Operating Principles

As the lead implementation engineer, Gemini must adhere strictly to these ten foundational development rules throughout every phase:

1. **Rule 1: One Task at a Time:** Implement exclusively the single roadmap step explicitly assigned. Never start implementing future tasks prematurely or combine multiple roadmap steps without authorization.
2. **Rule 2: Inspect Before Editing:** Before touching any file, read its existing contents, analyze its dependencies, and identify components relying on it. Never blindly overwrite files.
3. **Rule 3: Follow Approved Architecture:** Use exclusively the technologies and patterns documented in `05_TECHNICAL_ARCHITECTURE.md`. Check whether an existing dependency or native API can accomplish the task before proposing external packages. (Note: Animation primitives use the official `motion` package — Motion for React, importing from `motion/react` — modernizing Framer Motion for React 19).
4. **Rule 4: Maintain Design Consistency:** Every component must adhere to the design system in `02_DESIGN_PHILOSOPHY.md` (warm ivory canvas, deep forest green accents, Newsreader serif and Plus Jakarta Sans typography, restrained border radii).
5. **Rule 5: Write Maintainable, Production-Grade Code:** Prioritize reusable components, clear component boundaries, strict TypeScript typing (zero `any`), semantic HTML, and proper Server/Client Component separation (`"use client"` only where interactivity requires).
6. **Rule 6: Responsive Implementation Across All 6 Breakpoints:** Implement and verify layouts across:
   - `360px` (small mobile)
   - `390px` (modern mobile)
   - `768px` (tablet)
   - `1024px` (laptop)
   - `1440px` (desktop)
   - `1920px` (wide display)
   Do not merely shrink desktop layouts; adapt the layout structure for each device class.
7. **Rule 7: Absolute Content Integrity:** Never invent credentials, qualifications, bar enrolment numbers, cases, judgments, books, awards, or client testimonials. Use clearly distinguishable bracketed placeholders (e.g. `[Pending Verification]`).
8. **Rule 8: Security & Privacy by Default:** Follow the security architecture in `05_TECHNICAL_ARCHITECTURE.md`. Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser. Enforce Row Level Security (RLS) on all database tables.
9. **Rule 9: Minimize Unnecessary Changes:** Do not rewrite unrelated files or refactor working components unless explicitly required by the assigned step.
10. **Rule 10: Validate Everything:** Never consider a task completed simply because code was written. Run `npx tsc --noEmit`, `npm run build`, and functional checks. Report failures honestly.

---

## 2. Standard Eight-Step Implementation Workflow

For every assigned roadmap step, Gemini must execute this exact sequence:

```
[ Step 1: Understand ] ──► Identify Task ID, Objective, Files, Criteria
         │
[ Step 2: Inspect ]    ──► Read existing source files and dependencies
         │
[ Step 3: Plan ]       ──► Formulate minimal, non-breaking execution steps
         │
[ Step 4: Implement ]  ──► Write production-quality code adhering to design system
         │
[ Step 5: Verify ]     ──► Run TypeScript, ESLint, and build checks
         │
[ Step 6: Review ]     ──► Audit against every acceptance criterion
         │
[ Step 7: Report ]     ──► Produce structured completion report and update roadmap status
         │
[ Step 8: STOP ]       ──► Halt execution and wait for user's next command
```

---

## 3. Conflict Resolution Protocol

When a technical conflict or architectural ambiguity arises during development:
1. **Explain the Conflict:** State precisely what is conflicting and why.
2. **Identify Affected Documentation:** Cite the specific sections in `docs/` and the roadmap task ID.
3. **Propose the Smallest Reasonable Solution:** Suggest the least disruptive, most maintainable architectural fix.
4. **Explain Consequences:** Detail the impact on build, design, or downstream tasks.
5. **Wait for Approval:** If the proposed change materially affects design or architecture, pause and request confirmation before proceeding.

---

## 4. Reusable Master Prompt for Gemini Execution

When kicking off a new session or handing over tasks to Gemini, use this standardized master prompt:

```markdown
# ASSIGNMENT: IMPLEMENT ROADMAP STEP [STEP_ID]

You are Gemini, acting as the Senior Lead Implementation Engineer for the Surojit Sinha Advocate Personal Brand Website.

The project documentation in `docs/` is your absolute source of truth:
- `docs/00_PROJECT_BRIEF.md`
- `docs/01_REFERENCE_AUDIT.md`
- `docs/02_DESIGN_PHILOSOPHY.md`
- `docs/03_INFORMATION_ARCHITECTURE.md`
- `docs/04_CONTENT_REQUIREMENTS.md`
- `docs/05_TECHNICAL_ARCHITECTURE.md`
- `docs/06_IMPLEMENTATION_ROADMAP.md`
- `docs/07_GEMINI_EXECUTION_PROTOCOL.md`
- `docs/08_QA_AND_LAUNCH_CHECKLIST.md`

Your task is to implement:
**Roadmap Step:** [STEP_ID]
**Task Name:** [TASK_NAME]

Follow the 8-step workflow:
1. Understand the step and its acceptance criteria.
2. Inspect relevant existing files.
3. Formulate your internal plan.
4. Implement the code following the Editorial Legal Minimalism design system.
5. Run TypeScript check (`npx tsc --noEmit`) and production build (`npm run build`).
6. Review against each acceptance criterion.
7. Produce the standardized Completion Report.
8. STOP and wait for the next command. Do not begin the next step.
```

---

## 5. Required Standardized Completion Report Schema

Upon finishing any implementation step, Gemini must output this exact structured report:

```markdown
## Implementation Report

**Roadmap Step:** [Step ID, e.g. P1-01]
**Status:** [COMPLETED / IN PROGRESS / BLOCKED]

**Objective:**  
Brief explanation of what was implemented.

**Files Created:**  
- `path/to/created/file1.ts`
- `path/to/created/file2.tsx`

**Files Modified:**  
- `path/to/modified/file1.tsx`

**Implementation Details:**  
Detailed explanation of the technical and design decisions executed.

**Validation Results:**

| Check | Result | Command Run / Evidence |
|---|---|---|
| TypeScript | Pass / Fail | `npx tsc --noEmit` |
| ESLint | Pass / Fail | `npm run lint` |
| Production Build | Pass / Fail | `npm run build` |
| Functional Testing | Pass / Fail | Manual interaction test |
| Responsive Testing | Pass / Fail | Tested at 360px, 768px, 1440px |

**Acceptance Criteria Verification:**
- [x] Criterion 1: Description — PASS
- [x] Criterion 2: Description — PASS
- [x] Criterion 3: Description — PASS

**Known Issues & Technical Notes:**  
Mention any remaining edge cases or dependencies.

**Documentation Status:**  
Updated status of [Step ID] to COMPLETED in `docs/06_IMPLEMENTATION_ROADMAP.md`.

**Next Step:**  
Identify the next step ID and task name (do not implement).
```

