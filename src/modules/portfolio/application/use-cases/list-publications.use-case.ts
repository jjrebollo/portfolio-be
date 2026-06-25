import { Inject, Injectable } from '@nestjs/common';
import { PORTFOLIO_READ_REPOSITORY } from '../../domain/portfolio.repository';
import type { PortfolioReadRepository } from '../../domain/portfolio.repository';
import { SupportedLocale } from '../../domain/portfolio.types';
import { toPublicationSummary } from '../portfolio.mapper';

@Injectable()
export class ListPublicationsUseCase {
  constructor(
    @Inject(PORTFOLIO_READ_REPOSITORY)
    private readonly portfolioReadRepository: PortfolioReadRepository,
  ) {}

  async execute(locale: SupportedLocale) {
    const publications =
      await this.portfolioReadRepository.listPublications(locale);

    return { items: publications.map(toPublicationSummary) };
  }
}
