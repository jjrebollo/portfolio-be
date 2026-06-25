# Portfolio Backend

[![Version](https://img.shields.io/github/package-json/v/jjrebollo/portfolio-be?label=version&color=blue)](https://github.com/jjrebollo/portfolio-be/releases)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Node](https://img.shields.io/badge/Node-%E2%89%A5%2022-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Deployed on Railway](https://img.shields.io/badge/Deployed%20on-Railway-7B3FE4?logo=railway&logoColor=white)](https://railway.app/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-FE5196?logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Backend API for serving the portfolio content to the Astro frontend and future iOS and Android apps.

## Stack

- NestJS 11
- TypeScript
- Prisma ORM
- PostgreSQL
- OpenAPI / Swagger
- Zod-based payload and environment validation

## Architecture

This backend is a **modular monolith** with a layered structure (domain, application, infrastructure, presentation).

- `src/core`
  Cross-cutting infrastructure: runtime bootstrap, environment validation, Prisma, security (API key guard), and the Zod exception filter.
- `src/modules/health`
  Operational health endpoint.
- `src/modules/portfolio`
  Localized portfolio snapshots. Persistence is keyed by `(locale, status)`, so each locale has an independent `DRAFT` and `PUBLISHED` snapshot.
  - Public, read-only access to published content.
  - Guarded admin access to save drafts and publish them.

The repository follows a CQRS-lite split (`PortfolioReadRepository` / `PortfolioWriteRepository`), and untrusted admin payloads are validated at the boundary against a versioned Zod contract (`schemaVersion`).

## API

All routes are versioned under `/api/v1`. Interactive docs (Swagger UI) live at `/docs`.

Supported locales: `en`, `es`, `pt`.

### Public (read-only)

| Method & path | Description |
| --- | --- |
| `GET /api/v1/health` | Liveness probe → `{ "status": "ok", "service": "portfolio-be" }`. |
| `GET /api/v1/portfolio/locales` | Locales that have published content → `{ "items": ["en", "es", "pt"] }`. |
| `GET /api/v1/portfolio` | Published content for the locale resolved from the `Accept-Language` header (falls back to `en`). Returns `404` when the locale has no published snapshot. |

### Admin (requires the `x-api-key` header)

The admin API is guarded by `ApiKeyGuard`, which compares `x-api-key` against `ADMIN_API_KEY` in constant time and **fails closed** when the key is not configured. Missing or invalid keys return `401`.

| Method & path | Description |
| --- | --- |
| `PUT /api/v1/admin/portfolio/:locale/draft` | Create or replace the `DRAFT` snapshot for a locale. The JSON body is validated against the versioned payload contract; invalid payloads return `400` with an `issues` array. |
| `GET /api/v1/admin/portfolio/:locale/draft` | Read the current draft. `404` when no draft exists. |
| `POST /api/v1/admin/portfolio/:locale/publish` | Promote the current draft to `PUBLISHED` (no body). `404` when there is no draft to publish. |
| `GET /api/v1/admin/portfolio/:locale/publications` | List the publication history (version + timestamp), newest first → `{ "items": [{ "version": 2, "publishedAt": "…" }, …] }`. |
| `POST /api/v1/admin/portfolio/:locale/publications/:version/restore` | Re-publish a prior version (no body). `404` when the version does not exist, `400` when `:version` is not an integer. |

Content lifecycle: **`PUT draft` → `POST publish`**. Public reads only ever expose `PUBLISHED` snapshots, so changes stay invisible to clients until they are published.

#### Publication history & rollback

Every publish (including a restore) appends an immutable row to a versioned, append-only history (`PortfolioPublication`), written in the same transaction as the live snapshot. This means a bad publish can always be rolled back: list the versions, then `restore` the last good one — which itself becomes a new version, preserving the full audit trail. (This is complementary to Railway's whole-database backups, which cover catastrophic recovery.)

#### Payload contract

Draft writes are validated against a versioned [Zod](https://zod.dev/) schema (`schemaVersion`, currently `1`). The top-level shape is enforced while nested sections stay open (`passthrough`), so content can evolve without a migration:

```jsonc
{
  "schemaVersion": 1,                          // optional, defaults to 1
  "siteMeta": { "lang": "en", "title": "…" },  // lang + title required
  "navigationLinks": [                          // array of { label, href }
    { "label": "Skills", "href": "/#skills" }
  ],
  "siteContent": {}                             // any object
}
```

Snapshot responses (public `GET /portfolio` and every admin endpoint) share one shape: the stored payload spread alongside `locale`, `status`, `publishedAt` (ISO string or `null`), and `updatedAt` (ISO string).

## Local setup

```bash
npm install
cp .env.example .env
docker compose up -d
npm run prisma:migrate:dev -- --name init
npm run prisma:seed
npm run start:dev
```

Default API URL:

- `http://localhost:3000`

## Scripts

```bash
npm run build
npm run lint
npm run lint:check
npm run test
npm run test:cov
npm run test:e2e
npm run prisma:generate
npm run prisma:migrate:dev
npm run prisma:migrate:deploy
npm run prisma:seed
```

## Testing

Tests run on **Node 22** (the version this project targets).

- **Unit tests** — fast and database-free; the boundaries are mocked. Coverage
  is enforced via thresholds in the Jest config (`npm run test:cov`).
- **End-to-end tests** — boot the real Nest application and exercise the HTTP API
  against PostgreSQL. They run against an isolated `portfolio_test` database (never
  development data) and apply migrations automatically before the suite.

```bash
npm test            # unit tests
npm run test:cov    # unit tests + coverage (fails below thresholds)
npm run test:e2e    # end-to-end tests (requires PostgreSQL)
```

For e2e locally, start the database and create the test database once:

```bash
docker compose up -d
docker compose exec postgres createdb -U portfolio portfolio_test
```

The e2e runner uses `DATABASE_URL` when set, otherwise it defaults to the local
`portfolio_test` database, plus `ADMIN_API_KEY` (default `e2e-admin-key`).

### Continuous integration

`.github/workflows/ci.yml` runs lint, build, unit tests (with coverage gates) and
e2e tests — backed by a PostgreSQL service — on every push and pull request.
Configure its `test` job as a required status check so pull requests cannot merge
unless it passes.

## Environment

See `.env.example`:

- `NODE_ENV`
- `PORT`
- `DATABASE_URL`
- `ADMIN_API_KEY` — shared secret for the admin draft/publish API, sent via the `x-api-key` header. The admin endpoints fail closed when this is not configured.

## Deployment

The backend runs on [Railway](https://railway.app/): a NestJS service plus a managed PostgreSQL database.

- **Build** — Nixpacks (`railway.json`), Node 22.
- **Migrations on deploy** — the start command runs `prisma migrate deploy` before `node dist/main`.
- **Health check** — Railway gates each deploy on `GET /api/v1/health`.
- **Release-gated deploys** — when release-please creates a release (its release PR is merged), the `release-please` workflow calls the reusable `deploy-production` workflow to run `railway up`, so production only deploys on an actual release. `deploy-production` is also runnable manually via `workflow_dispatch` for bootstrap/ad-hoc deploys. It requires the `RAILWAY_TOKEN` secret and the `RAILWAY_SERVICE` variable.

Required production environment: `DATABASE_URL` (the Railway Postgres reference), `ADMIN_API_KEY`, and `NODE_ENV=production`. `PORT` is injected by Railway.

### Seeding production (one-time)

`prisma migrate deploy` creates the schema but no rows, and `prisma:seed` relies on `ts-node` (a dev dependency that is absent from the production image). Seed the database once by running the script locally against the Railway Postgres **public** connection URL:

```bash
DATABASE_URL="<railway-postgres-public-url>" npm run prisma:seed
```

After the initial seed, content is managed at runtime through the admin draft/publish API — re-running the seed overwrites the published `en` / `es` / `pt` snapshots.

## Notes

- Global request validation is enabled; admin payloads are additionally validated against a versioned Zod contract.
- Routes are versioned under `/api/v1`.
- The initial seed extracts the current portfolio content into the database for all supported locales.

## Versioning & releases

This project follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`)
and uses [Conventional Commits](https://www.conventionalcommits.org/). Releases are
automated with [release-please](https://github.com/googleapis/release-please):

- Branching model: **GitHub Flow** — short-lived feature branches merged into `main` via PR.
- Commit messages drive the version bump: `fix:` → patch, `feat:` → minor,
  `feat!:` / `BREAKING CHANGE:` → minor while pre-`1.0.0` (major from `1.0.0` onward).
- On every push to `main`, release-please maintains a release PR that updates
  `package.json`, `CHANGELOG.md`, and—when merged—creates the git tag and GitHub Release.

Common commit types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`, `ci`, `build`.

## License

Released under the [MIT License](./LICENSE).
