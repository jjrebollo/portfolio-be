import { PortfolioReadRepository } from '../../domain/portfolio.repository';
import { SupportedLocale } from '../../domain/portfolio.types';
import { ListPublishedLocalesUseCase } from './list-published-locales.use-case';

function build(locales: SupportedLocale[]) {
  const repo = {
    listPublishedLocales: jest.fn().mockResolvedValue(locales),
  } as unknown as PortfolioReadRepository;
  return new ListPublishedLocalesUseCase(repo);
}

describe('ListPublishedLocalesUseCase', () => {
  it('wraps the locales in an items envelope', async () => {
    expect(await build(['en', 'es']).execute()).toEqual({
      items: ['en', 'es'],
    });
  });

  it('returns an empty items array when nothing is published', async () => {
    expect(await build([]).execute()).toEqual({ items: [] });
  });
});
