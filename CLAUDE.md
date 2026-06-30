# Project: ai-based-repo-template
## Stack: [Framework + Language + Database + Deploy]

## Commands
```
build:     npm run build
test:      npm run test -- --watch=false
lint:      npm run lint
types:     tsc --noEmit
```

## Architecture
```
/src/features  = domain logic, hooks, state
/src/lib       = shared utilities, API helpers
/src/components = design components only
/app           = route files and server components
```

## Rules
- IMPORTANT: run type-check after every code change (because silent type errors compound fast)
- Never push to main branch — PR always (because main is protected and shared)
- Ask before changing 3+ files in one operation (because blast radius becomes hard to review)
- Functional components only, no class components (because hooks don't compose with class components)
- Make minimal changes — no edits outside the stated scope (because surprises in diffs slow reviews)

## Safety Boundaries
DO NOT change without explicit confirmation:
- `lib/auth/`
- `src/database/migrations/`
- `app/api/`

## Compact Instructions
When compressing context, always preserve:
- Current task goal and acceptance criteria
- Files edited this session
- Pending TODOs or blockers
- Any decisions made about architecture or approach

## Workflow
- `/compact` every ~10 turns to keep context lean
- Write tests first, commit failing tests, never let Claude modify tests
- Use verification subagent — fresh model grades work it didn't produce
- Commit per logical unit; new session per feature
