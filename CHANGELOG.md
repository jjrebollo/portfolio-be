# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Releases are automated from [Conventional Commits](https://www.conventionalcommits.org/)
via release-please.

## [0.1.0] - 2026-06-22

### Added

- Modular NestJS + Prisma backend serving localized portfolio snapshots.
- Public read API: health check, published-locale listing, and `Accept-Language`
  based published content.
- Guarded admin API to save drafts and publish them per locale, protected by an
  `x-api-key` header.
- CQRS-lite repository split and a versioned Zod payload contract validated at
  the boundary.
