import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PORTFOLIO_READ_REPOSITORY } from '../../domain/portfolio.repository';
import type { PortfolioReadRepository } from '../../domain/portfolio.repository';
import { SupportedLocale } from '../../domain/portfolio.types';
import { toPortfolioResponse } from '../portfolio.mapper';

@Injectable()
export class GetDraftUseCase {
  constructor(
    @Inject(PORTFOLIO_READ_REPOSITORY)
    private readonly portfolioReadRepository: PortfolioReadRepository,
  ) {}

  async execute(locale: SupportedLocale) {
    const snapshot = await this.portfolioReadRepository.findByLocaleAndStatus(
      locale,
      'DRAFT',
    );

    if (!snapshot) {
      throw new NotFoundException(
        `No draft portfolio found for locale "${locale}".`,
      );
    }

    return toPortfolioResponse(snapshot);
  }
}
