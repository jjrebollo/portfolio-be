import { NotFoundException } from '@nestjs/common';
import { PortfolioReadRepository } from '../../domain/portfolio.repository';
import { PortfolioSnapshot } from '../../domain/portfolio.types';
import { GetDraftUseCase } from './get-draft.use-case';

const draft: PortfolioSnapshot = {
  locale: 'en',
  status: 'DRAFT',
  payload: {
    schemaVersion: 1,
    siteMeta: { lang: 'en', title: 'T' },
    navigationLinks: [],
    siteContent: {},
  },
  publishedAt: null,
  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
};

function build(found: PortfolioSnapshot | null) {
  const repo = {
    findByLocaleAndStatus: jest.fn().mockResolvedValue(found),
  } as unknown as PortfolioReadRepository;
  return { useCase: new GetDraftUseCase(repo), repo };
}

describe('GetDraftUseCase', () => {
  it('returns the current draft', async () => {
    const { useCase, repo } = build(draft);

    const result = await useCase.execute('en');

    expect(repo.findByLocaleAndStatus).toHaveBeenCalledWith('en', 'DRAFT');
    expect(result.status).toBe('DRAFT');
  });

  it('throws NotFound when no draft exists', async () => {
    const { useCase } = build(null);

    await expect(useCase.execute('en')).rejects.toThrow(NotFoundException);
  });
});
