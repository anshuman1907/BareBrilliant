# Architecture Rules

## Standard directory structure
```
/src
  /features
    /{domain}
      {domain}.controller.ts   ← HTTP layer only — parse request, call service, return response
      {domain}.service.ts      ← business logic and use cases — no HTTP, no raw SQL
      {domain}.repository.ts   ← DB access only — no business logic
      {domain}.routes.ts       ← route registration and middleware wiring
      {domain}.types.ts        ← types and interfaces scoped to this domain
      {domain}.test.ts         ← all tests for this domain
  /shared                      (also acceptable: /lib)
    /db                        ← DB client setup, connection pooling
    /auth                      ← shared auth utilities
    /errors                    ← custom error classes
    /utils                     ← pure stateless helper functions
  /infra                       ← add only when a third-party concern grows complex
    /email
    /queue
    /storage
  app.ts / server.ts           ← entry point only, no business logic
```

## Layer contracts — never cross these
| Layer | May call | May NOT call |
|---|---|---|
| `controller` | `service` | `repository`, DB, `infra` directly |
| `service` | `repository`, `shared/*`, `infra/*` | HTTP objects (req/res/ctx) |
| `repository` | DB client (`shared/db`) | `service`, `controller`, `infra` |
| `shared/*` | nothing in `features/` | `features/` — ever |

## Dependency rules
- Features are siblings — one feature must not import from another feature
- `shared/` is the only cross-feature import allowed
- No circular imports — ever
- `infra/` is consumed by `service` layer only

## File placement rules
- New domain → new folder under `features/`, all 6 files created together
- Shared logic used by 2+ features → move to `shared/utils/` immediately
- Third-party integration (email, queue, storage) → always in `infra/`, never inline in a service
- DB connection, pooling, migrations → always in `shared/db/`

## Change rules
- Changing a `repository` interface requires updating its `service` callers
- Changing the DB schema requires a paired migration and rollback script
- Adding a new route requires adding it in `{domain}.routes.ts` and mounting in `app.ts`
- Never add business logic to `controller` — push it down to `service`
