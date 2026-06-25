# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Releases are automated from [Conventional Commits](https://www.conventionalcommits.org/)
via release-please.

## [0.2.0](https://github.com/jjrebollo/portfolio-be/compare/portfolio-be-v0.1.0...portfolio-be-v0.2.0) (2026-06-25)


### Features

* add publication history with rollback ([32fe04e](https://github.com/jjrebollo/portfolio-be/commit/32fe04e1f0cb5d5cb06da43f73635359c410dfd3))
* add publication history with rollback ([c77110a](https://github.com/jjrebollo/portfolio-be/commit/c77110a0ae5a4877a3d79c86be0a6f8c9a4987c2))

## [0.1.0] - 2026-06-22

### Added

- Modular NestJS + Prisma backend serving localized portfolio snapshots.
- Public read API: health check, published-locale listing, and `Accept-Language`
  based published content.
- Guarded admin API to save drafts and publish them per locale, protected by an
  `x-api-key` header.
- CQRS-lite repository split and a versioned Zod payload contract validated at
  the boundary.
