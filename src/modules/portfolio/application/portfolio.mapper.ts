import { PortfolioSnapshot } from '../domain/portfolio.types';

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
