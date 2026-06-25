import { PortfolioReadRepository } from '../../domain/portfolio.repository';
import { ListPublicationsUseCase } from './list-publications.use-case';

describe('ListPublicationsUseCase', () => {
  it('maps the history into an items envelope with ISO timestamps', async () => {
    const repo = {
      listPublications: jest.fn().mockResolvedValue([
        { version: 2, publishedAt: new Date('2026-01-02T00:00:00.000Z') },
        { version: 1, publishedAt: new Date('2026-01-01T00:00:00.000Z') },
      ]),
    } as unknown as PortfolioReadRepository;

    const result = await new ListPublicationsUseCase(repo).execute('en');

    expect(repo.listPublications).toHaveBeenCalledWith('en');
    expect(result).toEqual({
      items: [
        { version: 2, publishedAt: '2026-01-02T00:00:00.000Z' },
        { version: 1, publishedAt: '2026-01-01T00:00:00.000Z' },
      ],
    });
  });

  it('returns an empty list when there is no history', async () => {
    const repo = {
      listPublications: jest.fn().mockResolvedValue([]),
    } as unknown as PortfolioReadRepository;

    expect(await new ListPublicationsUseCase(repo).execute('en')).toEqual({
      items: [],
    });
  });
});
