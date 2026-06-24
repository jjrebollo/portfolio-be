import { PrismaService } from '../../../../core/database/prisma.service';
import { PortfolioPayload } from '../../domain/portfolio-payload.schema';
import { PrismaPortfolioRepository } from './prisma-portfolio.repository';

const payload: PortfolioPayload = {
  schemaVersion: 1,
  siteMeta: { lang: 'en', title: 'T' },
  navigationLinks: [],
  siteContent: {},
};

const persisted = {
  locale: 'en',
  status: 'PUBLISHED' as const,
  payload,
  publishedAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedAt: new Date('2026-01-02T00:00:00.000Z'),
};

function build() {
  const portfolioSnapshot = {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    upsert: jest.fn(),
  };
  const prisma = { portfolioSnapshot } as unknown as PrismaService;
  return { repo: new PrismaPortfolioRepository(prisma), portfolioSnapshot };
}

describe('PrismaPortfolioRepository', () => {
  it('findPublishedByLocale queries by the published compound key and maps the result', async () => {
    const { repo, portfolioSnapshot } = build();
    portfolioSnapshot.findUnique.mockResolvedValue(persisted);

    const result = await repo.findPublishedByLocale('en');

    expect(portfolioSnapshot.findUnique).toHaveBeenCalledWith({
      where: { locale_status: { locale: 'en', status: 'PUBLISHED' } },
    });
    expect(result).toMatchObject({ locale: 'en', status: 'PUBLISHED' });
  });

  it('findByLocaleAndStatus returns null when nothing is found', async () => {
    const { repo, portfolioSnapshot } = build();
    portfolioSnapshot.findUnique.mockResolvedValue(null);

    expect(await repo.findByLocaleAndStatus('es', 'DRAFT')).toBeNull();
  });

  it('listPublishedLocales returns only supported locales, ordered', async () => {
    const { repo, portfolioSnapshot } = build();
    portfolioSnapshot.findMany.mockResolvedValue([
      { locale: 'en' },
      { locale: 'es' },
      { locale: 'zz' },
    ]);

    const result = await repo.listPublishedLocales();

    expect(result).toEqual(['en', 'es']);
    expect(portfolioSnapshot.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: 'PUBLISHED' } }),
    );
  });

  it('upsertDraft writes a DRAFT with a null publishedAt', async () => {
    const { repo, portfolioSnapshot } = build();
    portfolioSnapshot.upsert.mockResolvedValue({
      ...persisted,
      status: 'DRAFT',
      publishedAt: null,
    });

    const result = await repo.upsertDraft('en', payload);

    const arg = portfolioSnapshot.upsert.mock.calls[0][0];
    expect(arg.where).toEqual({
      locale_status: { locale: 'en', status: 'DRAFT' },
    });
    expect(arg.create.status).toBe('DRAFT');
    expect(arg.create.publishedAt).toBeNull();
    expect(result.status).toBe('DRAFT');
  });

  it('upsertPublished writes a PUBLISHED snapshot with a publishedAt date', async () => {
    const { repo, portfolioSnapshot } = build();
    portfolioSnapshot.upsert.mockResolvedValue(persisted);

    await repo.upsertPublished('en', payload);

    const arg = portfolioSnapshot.upsert.mock.calls[0][0];
    expect(arg.create.status).toBe('PUBLISHED');
    expect(arg.create.publishedAt).toBeInstanceOf(Date);
    expect(arg.update.publishedAt).toBeInstanceOf(Date);
  });
});
