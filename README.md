# Portfolio Backend

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

### Public

- `GET /api/v1/health`
- `GET /api/v1/portfolio/locales` — list locales with published content
- `GET /api/v1/portfolio` — published content for the locale resolved from the `Accept-Language` header (defaults to `en`)

### Admin (requires `x-api-key` header)

- `PUT /api/v1/admin/portfolio/:locale/draft` — create or update the draft
- `GET /api/v1/admin/portfolio/:locale/draft` — read the current draft
- `POST /api/v1/admin/portfolio/:locale/publish` — publish the current draft

Swagger UI is available at `/docs`.

Supported locales:

- `en`
- `es`
- `pt`

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
npm run test
npm run test:e2e
npm run prisma:generate
npm run prisma:migrate:dev
npm run prisma:migrate:deploy
npm run prisma:seed
```

## Environment

See `.env.example`:

- `NODE_ENV`
- `PORT`
- `DATABASE_URL`
- `ADMIN_API_KEY` — shared secret for the admin draft/publish API, sent via the `x-api-key` header. The admin endpoints fail closed when this is not configured.

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
