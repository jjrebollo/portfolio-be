import { Inject, Injectable } from '@nestjs/common';
import { parsePortfolioPayload } from '../../domain/portfolio-payload.schema';
import { PORTFOLIO_WRITE_REPOSITORY } from '../../domain/portfolio.repository';
import type { PortfolioWriteRepository } from '../../domain/portfolio.repository';
import { SupportedLocale } from '../../domain/portfolio.types';
import { toPortfolioResponse } from '../portfolio.mapper';

@Injectable()
export class SaveDraftUseCase {
  constructor(
    @Inject(PORTFOLIO_WRITE_REPOSITORY)
    private readonly portfolioWriteRepository: PortfolioWriteRepository,
  ) {}

  async execute(locale: SupportedLocale, rawPayload: unknown) {
    const payload = parsePortfolioPayload(rawPayload);
    const snapshot = await this.portfolioWriteRepository.upsertDraft(
      locale,
      payload,
    );

    return toPortfolioResponse(snapshot);
  }
}
