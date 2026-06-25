import {
  PortfolioPublicationSummary,
  PortfolioSnapshot,
} from '../domain/portfolio.types';
import { toPortfolioResponse, toPublicationSummary } from './portfolio.mapper';

const payload = {
  schemaVersion: 1,
  siteMeta: { lang: 'en', title: 'T' },
  navigationLinks: [],
  siteContent: {},
};

describe('toPortfolioResponse', () => {
  it('spreads the payload and serializes timestamps to ISO strings', () => {
    const snapshot: PortfolioSnapshot = {
      locale: 'en',
      status: 'PUBLISHED',
      payload,
      publishedAt: new Date('2026-01-02T03:04:05.000Z'),
      updatedAt: new Date('2026-01-02T03:04:06.000Z'),
    };

    expect(toPortfolioResponse(snapshot)).toEqual({
      locale: 'en',
      status: 'PUBLISHED',
      schemaVersion: 1,
      siteMeta: { lang: 'en', title: 'T' },
      navigationLinks: [],
      siteContent: {},
      publishedAt: '2026-01-02T03:04:05.000Z',
      updatedAt: '2026-01-02T03:04:06.000Z',
    });
  });

  it('maps a null publishedAt to null', () => {
    const snapshot: PortfolioSnapshot = {
      locale: 'es',
      status: 'DRAFT',
      payload,
      publishedAt: null,
      updatedAt: new Date('2026-01-02T03:04:06.000Z'),
    };

    const response = toPortfolioResponse(snapshot);

    expect(response.publishedAt).toBeNull();
    expect(response.status).toBe('DRAFT');
  });
});

describe('toPublicationSummary', () => {
  it('maps version and serializes publishedAt to an ISO string', () => {
    const summary: PortfolioPublicationSummary = {
      version: 3,
      publishedAt: new Date('2026-01-02T03:04:05.000Z'),
    };

    expect(toPublicationSummary(summary)).toEqual({
      version: 3,
      publishedAt: '2026-01-02T03:04:05.000Z',
    });
  });
});
