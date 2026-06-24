import { NotFoundException } from '@nestjs/common';
import { PortfolioReadRepository } from '../../domain/portfolio.repository';
import { PortfolioSnapshot } from '../../domain/portfolio.types';
import { GetPublishedPortfolioUseCase } from './get-published-portfolio.use-case';

const snapshot: PortfolioSnapshot = {
  locale: 'en',
  status: 'PUBLISHED',
  payload: {
    schemaVersion: 1,
    siteMeta: { lang: 'en', title: 'T' },
    navigationLinks: [],
    siteContent: {},
  },
  publishedAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
};

function build(found: PortfolioSnapshot | null) {
  const repo = {
    findPublishedByLocale: jest.fn().mockResolvedValue(found),
  } as unknown as PortfolioReadRepository;
  return { useCase: new GetPublishedPortfolioUseCase(repo), repo };
}

describe('GetPublishedPortfolioUseCase', () => {
  it('returns the mapped published snapshot', async () => {
    const { useCase, repo } = build(snapshot);

    const result = await useCase.execute('en');

    expect(repo.findPublishedByLocale).toHaveBeenCalledWith('en');
    expect(result).toMatchObject({ locale: 'en', status: 'PUBLISHED' });
  });

  it('throws NotFound when nothing is published for the locale', async () => {
    const { useCase } = build(null);

    await expect(useCase.execute('en')).rejects.toThrow(NotFoundException);
  });
});
