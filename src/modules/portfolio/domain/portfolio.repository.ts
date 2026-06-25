import { PortfolioPayload } from './portfolio-payload.schema';
import {
  PortfolioPublication,
  PortfolioPublicationSummary,
  PortfolioSnapshot,
  SnapshotStatus,
  SupportedLocale,
} from './portfolio.types';

export const PORTFOLIO_READ_REPOSITORY = Symbol('PORTFOLIO_READ_REPOSITORY');
export const PORTFOLIO_WRITE_REPOSITORY = Symbol('PORTFOLIO_WRITE_REPOSITORY');

export interface PortfolioReadRepository {
  findPublishedByLocale(
    locale: SupportedLocale,
  ): Promise<PortfolioSnapshot | null>;
  findByLocaleAndStatus(
    locale: SupportedLocale,
    status: SnapshotStatus,
  ): Promise<PortfolioSnapshot | null>;
  listPublishedLocales(): Promise<SupportedLocale[]>;
  listPublications(
    locale: SupportedLocale,
  ): Promise<PortfolioPublicationSummary[]>;
  findPublication(
    locale: SupportedLocale,
    version: number,
  ): Promise<PortfolioPublication | null>;
}

export interface PortfolioWriteRepository {
  upsertDraft(
    locale: SupportedLocale,
    payload: PortfolioPayload,
  ): Promise<PortfolioSnapshot>;
  // Publishes the payload and appends an immutable history entry atomically.
  publish(
    locale: SupportedLocale,
    payload: PortfolioPayload,
  ): Promise<PortfolioSnapshot>;
}
