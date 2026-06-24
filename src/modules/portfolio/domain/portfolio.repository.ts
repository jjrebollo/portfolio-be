import { PortfolioPayload } from './portfolio-payload.schema';
import {
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
}

export interface PortfolioWriteRepository {
  upsertDraft(
    locale: SupportedLocale,
    payload: PortfolioPayload,
  ): Promise<PortfolioSnapshot>;
  upsertPublished(
    locale: SupportedLocale,
    payload: PortfolioPayload,
  ): Promise<PortfolioSnapshot>;
}
