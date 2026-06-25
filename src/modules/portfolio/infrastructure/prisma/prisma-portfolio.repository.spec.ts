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
  const portfolioPublication = {
    findFirst: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  };
  const $transaction = jest
    .fn()
    .mockImplementation((cb) =>
      cb({ portfolioSnapshot, portfolioPublication }),
    );
  const prisma = {
    portfolioSnapshot,
    portfolioPublication,
    $transaction,
  } as unknown as PrismaService;
  return {
    repo: new PrismaPortfolioRepository(prisma),
    portfolioSnapshot,
    portfolioPublication,
    $transaction,
  };
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

  it('publish appends the next history version and updates the published snapshot in a transaction', async () => {
    const { repo, portfolioSnapshot, portfolioPublication, $transaction } =
      build();
    portfolioPublication.findFirst.mockResolvedValue({ version: 2 });
    portfolioPublication.create.mockResolvedValue({});
    portfolioSnapshot.upsert.mockResolvedValue(persisted);

    const result = await repo.publish('en', payload);

    expect($transaction).toHaveBeenCalledTimes(1);
    const createArg = portfolioPublication.create.mock.calls[0][0];
    expect(createArg.data).toMatchObject({ locale: 'en', version: 3 });
    expect(createArg.data.publishedAt).toBeInstanceOf(Date);

    const upsertArg = portfolioSnapshot.upsert.mock.calls[0][0];
    expect(upsertArg.create.status).toBe('PUBLISHED');
    expect(upsertArg.create.publishedAt).toBeInstanceOf(Date);
    expect(upsertArg.update.publishedAt).toBeInstanceOf(Date);
    expect(result.status).toBe('PUBLISHED');
  });

  it('publish starts versioning at 1 when there is no history', async () => {
    const { repo, portfolioSnapshot, portfolioPublication } = build();
    portfolioPublication.findFirst.mockResolvedValue(null);
    portfolioSnapshot.upsert.mockResolvedValue(persisted);

    await repo.publish('en', payload);

    expect(portfolioPublication.create.mock.calls[0][0].data.version).toBe(1);
  });

  it('listPublications returns version summaries, newest first', async () => {
    const { repo, portfolioPublication } = build();
    const rows = [
      { version: 3, publishedAt: new Date('2026-01-03T00:00:00.000Z') },
      { version: 2, publishedAt: new Date('2026-01-02T00:00:00.000Z') },
    ];
    portfolioPublication.findMany.mockResolvedValue(rows);

    const result = await repo.listPublications('en');

    expect(result).toEqual(rows);
    expect(portfolioPublication.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { locale: 'en' },
        orderBy: { version: 'desc' },
      }),
    );
  });

  it('findPublication maps a found version', async () => {
    const { repo, portfolioPublication } = build();
    portfolioPublication.findUnique.mockResolvedValue({
      id: 'x',
      locale: 'en',
      version: 2,
      payload,
      publishedAt: new Date('2026-01-02T00:00:00.000Z'),
    });

    const result = await repo.findPublication('en', 2);

    expect(portfolioPublication.findUnique).toHaveBeenCalledWith({
      where: { locale_version: { locale: 'en', version: 2 } },
    });
    expect(result).toMatchObject({ locale: 'en', version: 2 });
  });

  it('findPublication returns null when the version is missing', async () => {
    const { repo, portfolioPublication } = build();
    portfolioPublication.findUnique.mockResolvedValue(null);

    expect(await repo.findPublication('en', 99)).toBeNull();
  });
});
