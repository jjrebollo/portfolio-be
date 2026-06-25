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
export class RestorePublicationUseCase {
  constructor(
    @Inject(PORTFOLIO_READ_REPOSITORY)
    private readonly portfolioReadRepository: PortfolioReadRepository,
    @Inject(PORTFOLIO_WRITE_REPOSITORY)
    private readonly portfolioWriteRepository: PortfolioWriteRepository,
  ) {}

  async execute(locale: SupportedLocale, version: number) {
    const publication = await this.portfolioReadRepository.findPublication(
      locale,
      version,
    );

    if (!publication) {
      throw new NotFoundException(
        `No publication version ${version} found for locale "${locale}".`,
      );
    }

    // Re-publishing a prior version appends a new history entry that copies it,
    // keeping the history append-only.
    const payload = parsePortfolioPayload(publication.payload);
    const restored = await this.portfolioWriteRepository.publish(
      locale,
      payload,
    );

    return toPortfolioResponse(restored);
  }
}
