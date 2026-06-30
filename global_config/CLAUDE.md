# Global Rules — All Projects

## Coding Style

### Functions
- Name must describe exactly what it does — no vague names like `handle`, `process`, `doStuff`
- If the function isn't immediately obvious, add a one-line comment with input/output example:
  `// formatPrice(1999, "USD") → "$19.99"`
- Keep functions small — one responsibility, fits on one screen

### Types
- Strict types everywhere — no `any`, no implicit `unknown`, no untyped params
- Prefer explicit return types on all public functions
- Use discriminated unions over boolean flags for state

### Structure
- Follow the project's existing file/folder conventions — never invent new top-level dirs
- One module = one concern; split files before they get complex
- DRY: if you write the same logic twice, extract it before the third time

### Feature module layout (enforce this shape for every domain)
```
/src/features/{domain}/
  {domain}.controller.ts   ← HTTP layer only, no logic
  {domain}.service.ts      ← business logic and use cases
  {domain}.repository.ts   ← DB access only, no business logic
  {domain}.routes.ts       ← route registration
  {domain}.types.ts        ← types/interfaces for this domain
  {domain}.test.ts         ← all tests for this domain

/src/shared/               ← (or /src/lib)
  /db                      ← DB client setup and connection
  /auth                    ← shared auth utilities
  /errors                  ← custom error classes
  /utils                   ← pure stateless helper functions

/src/infra/                ← grows with complexity, add only when needed
  /email
  /queue
  /storage

app.ts / server.ts         ← entry point only, no business logic
```

Layer contract (strict — never cross these):
- `controller` calls `service` only — never `repository` directly
- `service` calls `repository` only — never HTTP objects (req/res)
- `repository` calls DB only — no business logic, no HTTP
- `shared/` has zero imports from `features/` — ever

### SOLID (apply at medium complexity and above)
- **S** — one reason to change per module
- **O** — extend via new code, not by editing stable code
- **L** — subtypes must honour the contract of their parent
- **I** — small, focused interfaces over fat ones
- **D** — depend on abstractions; inject dependencies

### Tests
- Tests are not optional — they are part of the feature
- Write tests first; commit failing; implement; make them pass
- Never modify existing passing tests
- Test behaviour, not implementation

## Universal Don'ts
- No `any` types
- No logic duplication
- No magic numbers — name your constants
- No PR without tests for the changed behaviour
