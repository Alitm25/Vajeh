# Architecture

Vajeh uses a **feature-based** structure with a framework-free domain core.

## Layers

```
src/
├─ app/        Next.js routes only. Thin: reads params, renders a feature.
├─ features/   Vertical product slices (auth, projects, members, import,
│              export, editor, glossary). Each exposes a public API via index.ts.
├─ server/     Data-access layer. The ONLY code that talks to the database.
├─ domain/     Pure TypeScript business logic. No React, Next, or DB imports.
├─ ui/         Shared primitives (Button, Dialog, Input, …), RTL-ready.
└─ lib/        Generic helpers (Intl formatting, class names, …).
```

## Dependency rule

```
app → features → server → domain
          ↘   ui, lib   ↗
domain → (nothing but itself and Zod)
```

- Enforced by `no-restricted-imports` in `eslint.config.mjs`, not just by convention.
- Features import each other only through `@/features/<name>` (their `index.ts`).

**Why:** the domain can be unit-tested in milliseconds without a browser or
database, and swapping the backend (e.g. Supabase → Postgres + Drizzle) only
touches `src/server/`.

## Feature folder shape

```
src/features/<name>/
├─ components/   React components for this feature
├─ hooks/        Client hooks
├─ actions.ts    Server Actions (validate input with Zod, call src/server)
├─ schemas.ts    Zod schemas for this feature's boundaries
└─ index.ts      Public API — the only file other features may import
```

## Domain modules (`src/domain/`)

| Module | Responsibility | Main API |
|---|---|---|
| `shared/` | `Result<T, E>`, branded types | `ok()`, `err()` |
| `locale/` | BCP 47 locale codes, text direction | `parseLocale()`, `directionOf()` |
| `translation/` | Types and status state machine | `transition(status, action, ctx)` |
| `formats/json/` | Parse, flatten/unflatten, preserve key order | `parseJsonFile()`, `flatten()`, `unflatten()` |
| `placeholders/` | Extract `{name}` and ICU plural/select args | `extractPlaceholders()` |
| `validation/` | Compare source vs target, issues with severity | `validateTranslation()` |
| `import-diff/` | Added / removed / changed keys on re-import | `diffImport()` |
| `export/` | Build final JSON (nested or flat, approved-only) | `buildExport()` |
| `glossary/` | Find glossary terms in source text | `findTerms()` |

## Product decisions reflected in the domain

- **Self-approval is configurable per project** (default: off). Personal
  projects usually have one member who is both translator and reviewer, so a
  hard ban would lock them out. `transition()` receives the actor, the author,
  the role, and `allowSelfApprove`, so the rule lives in exactly one place.
- Self-approvals are recorded as such in the translation history, so a team can
  tell reviewed translations from self-approved ones.
