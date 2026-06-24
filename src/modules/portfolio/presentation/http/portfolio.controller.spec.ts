import { GetPublishedPortfolioUseCase } from '../../application/use-cases/get-published-portfolio.use-case';
import { ListPublishedLocalesUseCase } from '../../application/use-cases/list-published-locales.use-case';
import { PortfolioController } from './portfolio.controller';

describe('PortfolioController', () => {
  it('lists published locales', async () => {
    const list = {
      execute: jest.fn().mockResolvedValue({ items: ['en', 'es'] }),
    } as unknown as ListPublishedLocalesUseCase;
    const get = {
      execute: jest.fn(),
    } as unknown as GetPublishedPortfolioUseCase;

    const controller = new PortfolioController(get, list);

    expect(await controller.listLocales()).toEqual({ items: ['en', 'es'] });
  });

  it('delegates portfolio retrieval to the use-case with the resolved locale', async () => {
    const get = {
      execute: jest.fn().mockResolvedValue({ locale: 'es' }),
    } as unknown as GetPublishedPortfolioUseCase;
    const list = {
      execute: jest.fn(),
    } as unknown as ListPublishedLocalesUseCase;

    const controller = new PortfolioController(get, list);

    expect(await controller.getPortfolio('es')).toEqual({ locale: 'es' });
    expect(get.execute).toHaveBeenCalledWith('es');
  });
});
