import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { parsePortfolioPayload } from '../../domain/portfolio-payload.schema';
import {
  PORTFOLIO_READ_REPOSITORY,
  PORTFOLIO_WRITE_REPOSITORY,
} from '../../domain/portfolio.repository';
import type {
  PortfolioReadRepository,
  PortfolioWriteRepository,
} from '../../domain/portfolio.repository';
import { SupportedLocale } from '../../domain/portfolio.types';
import { toPortfolioResponse } from '../portfolio.mapper';

@Injectable()
export class PublishPortfolioUseCase {
  constructor(
    @Inject(PORTFOLIO_READ_REPOSITORY)
    private readonly portfolioReadRepository: PortfolioReadRepository,
    @Inject(PORTFOLIO_WRITE_REPOSITORY)
    private readonly portfolioWriteRepository: PortfolioWriteRepository,
  ) {}

  async execute(locale: SupportedLocale) {
    const draft = await this.portfolioReadRepository.findByLocaleAndStatus(
      locale,
      'DRAFT',
    );

    if (!draft) {
      throw new NotFoundException(
        `No draft portfolio to publish for locale "${locale}".`,
      );
    }

    const payload = parsePortfolioPayload(draft.payload);
    const published = await this.portfolioWriteRepository.upsertPublished(
      locale,
      payload,
    );

    return toPortfolioResponse(published);
  }
}
