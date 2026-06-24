import { Inject, Injectable } from '@nestjs/common';
import { PORTFOLIO_READ_REPOSITORY } from '../../domain/portfolio.repository';
import type { PortfolioReadRepository } from '../../domain/portfolio.repository';

@Injectable()
export class ListPublishedLocalesUseCase {
  constructor(
    @Inject(PORTFOLIO_READ_REPOSITORY)
    private readonly portfolioReadRepository: PortfolioReadRepository,
  ) {}

  async execute() {
    const locales = await this.portfolioReadRepository.listPublishedLocales();

    return {
      items: locales,
    };
  }
}
