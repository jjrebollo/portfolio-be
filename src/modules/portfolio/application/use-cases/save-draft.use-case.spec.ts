import { PortfolioWriteRepository } from '../../domain/portfolio.repository';
import { SaveDraftUseCase } from './save-draft.use-case';

const validPayload = {
  schemaVersion: 1,
  siteMeta: { lang: 'en', title: 'T' },
  navigationLinks: [],
  siteContent: {},
};

describe('SaveDraftUseCase', () => {
  it('validates the payload and upserts a draft', async () => {
    const saved = {
      locale: 'en' as const,
      status: 'DRAFT' as const,
      payload: validPayload,
      publishedAt: null,
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    };
    const repo = {
      upsertDraft: jest.fn().mockResolvedValue(saved),
    } as unknown as PortfolioWriteRepository;

    const result = await new SaveDraftUseCase(repo).execute('en', validPayload);

    expect(repo.upsertDraft).toHaveBeenCalledWith(
      'en',
      expect.objectContaining({ schemaVersion: 1 }),
    );
    expect(result.status).toBe('DRAFT');
  });

  it('rejects an invalid payload without writing', async () => {
    const repo = {
      upsertDraft: jest.fn(),
    } as unknown as PortfolioWriteRepository;

    await expect(
      new SaveDraftUseCase(repo).execute('en', { siteMeta: {} }),
    ).rejects.toThrow();
    expect(repo.upsertDraft).not.toHaveBeenCalled();
  });
});
