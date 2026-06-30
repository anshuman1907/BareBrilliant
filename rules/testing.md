# Testing Rules

## Non-negotiables
- Write tests first — commit failing tests before implementing
- Never let Claude (or anyone) modify existing passing tests
- Use a verification subagent to grade work it didn't produce
- Tests must pass in CI — "works on my machine" is not passing

## Test types and where they live
| Type          | Location            | Runs on         |
|---------------|---------------------|-----------------|
| Unit          | `tests/unit/`       | Every commit    |
| Integration   | `tests/integration/`| Every PR        |
| E2E           | `tests/e2e/`        | Pre-deploy only |

## Mocking policy
- No mocks for the database — use a real test DB (docker-compose)
- Mock only: external HTTP APIs, email/SMS providers, payment gateways
- Never mock: your own modules, auth logic, business rules

## Coverage
- New features: 80% line coverage minimum before merge
- Bug fixes: must include a regression test that fails before the fix
- No coverage targets for `app/` route files — test via E2E

## Test naming
```
describe("ModuleName", () => {
  it("does X when Y", () => { ... })
  it("throws Z when input is invalid", () => { ... })
})
```
Name tests as behaviour statements — not implementation details.

## CI gates (must all pass to merge)
```bash
npm run test -- --watch=false   # unit + integration
tsc --noEmit                    # types
npm run lint                    # style
```
