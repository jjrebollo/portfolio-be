import { Module } from '@nestjs/common';
import { GetPublishedPortfolioUseCase } from './application/use-cases/get-published-portfolio.use-case';
import { ListPublishedLocalesUseCase } from './application/use-cases/list-published-locales.use-case';
import {
  PORTFOLIO_READ_REPOSITORY,
  PORTFOLIO_WRITE_REPOSITORY,
} from './domain/portfolio.repository';
import { PrismaPortfolioRepository } from './infrastructure/prisma/prisma-portfolio.repository';
import { PortfolioController } from './presentation/http/portfolio.controller';

@Module({
  controllers: [PortfolioController],
  providers: [
    GetPublishedPortfolioUseCase,
    ListPublishedLocalesUseCase,
    PrismaPortfolioRepository,
    {
      provide: PORTFOLIO_READ_REPOSITORY,
      useExisting: PrismaPortfolioRepository,
    },
    {
      provide: PORTFOLIO_WRITE_REPOSITORY,
      useExisting: PrismaPortfolioRepository,
    },
  ],
  exports: [PORTFOLIO_READ_REPOSITORY, PORTFOLIO_WRITE_REPOSITORY],
})
export class PortfolioModule {}
