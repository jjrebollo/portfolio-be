import { z } from 'zod';

/**
 * The version of the portfolio payload contract. Increment this whenever the
 * stored document shape changes in a backward-incompatible way so that clients
 * and migrations can evolve safely.
 */
export const PORTFOLIO_SCHEMA_VERSION = 1;

const navigationLinkSchema = z
  .object({
    label: z.string().min(1),
    href: z.string().min(1),
  })
  .passthrough();

const siteMetaSchema = z
  .object({
    lang: z.string().min(1),
    title: z.string().min(1),
  })
  .passthrough();

/**
 * Domain-level contract for a localized portfolio document.
 *
 * The nested sections use `.passthrough()` so the snapshot can keep evolving
 * without freezing every field, while still guaranteeing the top-level shape is
 * consistent across every locale that is written through the admin API.
 */
export const portfolioPayloadSchema = z.object({
  schemaVersion: z
    .literal(PORTFOLIO_SCHEMA_VERSION)
    .default(PORTFOLIO_SCHEMA_VERSION),
  siteMeta: siteMetaSchema,
  navigationLinks: z.array(navigationLinkSchema),
  siteContent: z.object({}).passthrough(),
});

export type PortfolioPayload = z.infer<typeof portfolioPayloadSchema>;

/**
 * Validates and normalizes an untrusted payload against the domain contract.
 * Throws a `ZodError` when the payload does not satisfy the schema.
 */
export function parsePortfolioPayload(payload: unknown): PortfolioPayload {
  return portfolioPayloadSchema.parse(payload);
}
