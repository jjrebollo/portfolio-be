import {
  PortfolioPublicationSummary,
  PortfolioSnapshot,
} from '../domain/portfolio.types';

/**
 * Maps a persisted snapshot into the response contract shared by the public and
 * admin endpoints. Timestamps are serialized to ISO strings for transport.
 */
export function toPortfolioResponse(snapshot: PortfolioSnapshot) {
  return {
    locale: snapshot.locale,
    status: snapshot.status,
    ...snapshot.payload,
    publishedAt: snapshot.publishedAt?.toISOString() ?? null,
    updatedAt: snapshot.updatedAt.toISOString(),
  };
}

/**
 * Maps a publication history entry into its transport shape (without the
 * payload, which the list endpoint omits to stay lightweight).
 */
export function toPublicationSummary(publication: PortfolioPublicationSummary) {
  return {
    version: publication.version,
    publishedAt: publication.publishedAt.toISOString(),
  };
}
